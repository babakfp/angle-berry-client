import { error } from "@sveltejs/kit"
import PocketBase from "pocketbase"
import { POCKETBASE_URL } from "$env/static/private"
import { pbHandleClientResponseError, getPreviewTierId } from "$utilities/pb"
import type {
    UsersResponse,
    TiersResponse,
    ClientResponseError,
} from "$utilities/pb-types"

export async function handle({ event, resolve }) {
    if (!POCKETBASE_URL)
        throw error(500, {
            message: "Missing REQUIRED Environment Variable POCKETBASE_URL",
        })

    event.locals.pb = new PocketBase(POCKETBASE_URL)
    event.locals.pb.authStore.loadFromCookie(
        event.request.headers.get("cookie") || "",
    )

    event.locals.user = event.locals.pb.authStore.isValid
        ? (event.locals.pb.authStore.model as UsersResponse)
        : null

    if (event.locals.user) {
        try {
            await event.locals.pb.collection("users").authRefresh()
        } catch (e) {
            if ((e as ClientResponseError).status === 401) {
                event.locals.pb.authStore.clear()
                event.locals.user = null
            } else {
                pbHandleClientResponseError(e as ClientResponseError)
                throw e
            }
        }
    }

    try {
        const tiers = (await event.locals.pb
            .collection("tiers")
            .getFullList()) as TiersResponse[]
        event.locals.previewTierId = getPreviewTierId(tiers)
        event.locals.tiers = tiers
    } catch (e) {
        pbHandleClientResponseError(e as ClientResponseError)
        throw e
    }

    const response = await resolve(event)

    response.headers.set(
        "set-cookie",
        event.locals.pb.authStore.exportToCookie({
            secure: false,
            httpOnly: false,
        }),
    )

    return response
}

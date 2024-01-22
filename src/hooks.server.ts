import { error } from "@sveltejs/kit"
import PocketBase from "pocketbase"
import { PUBLIC_POCKETBASE_URL } from "$env/static/public"
import { pbHandleClientResponseError, getPreviewTierId } from "$utilities/pb"
import {
    type UsersResponse,
    type TiersResponse,
    ClientResponseError,
} from "$utilities/pb-types"

export const handle = async ({ event, resolve }) => {
    if (!PUBLIC_POCKETBASE_URL)
        error(500, {
            message:
                "Missing REQUIRED Environment Variable PUBLIC_POCKETBASE_URL",
        })

    event.locals.pb = new PocketBase(PUBLIC_POCKETBASE_URL)
    event.locals.pb.authStore.loadFromCookie(
        event.request.headers.get("cookie") || "",
    )

    if (event.locals.pb.authStore.isValid) {
        try {
            const { record } = await event.locals.pb
                .collection("users")
                .authRefresh()
            event.locals.user = record as UsersResponse
        } catch (e) {
            if (e instanceof ClientResponseError) {
                if (e.status === 401) {
                    event.locals.pb.authStore.clear()
                } else {
                    pbHandleClientResponseError(e)
                }
            } else {
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
        if (e instanceof ClientResponseError) {
            pbHandleClientResponseError(e)
        }
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

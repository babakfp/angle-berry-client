import { error } from "@sveltejs/kit"
import PocketBase from "pocketbase"
import { PUBLIC_POCKETBASE_URL } from "$env/static/public"
import { pbHandleClientResponseError } from "@/lib/utilities/pb/helpers"
import { ClientResponseError } from "@/lib/utilities/pb/types"

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
            event.locals.loggedInUser = (
                await event.locals.pb.collection("users").authRefresh()
            ).record
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
        const previewTierId = (
            await event.locals.pb.collection("tiers").getFullList({
                filter: 'price = 0 && invites = 0 && visibility = "public"',
            })
        ).at(0)?.id
        event.locals.previewTierId = previewTierId
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

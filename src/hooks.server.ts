import { error } from "@sveltejs/kit"
import PocketBase from "pocketbase"
import { PUBLIC_PB_URL } from "$env/static/public"
import { pbHandleError } from "$lib/utilities/pb"

export const handle = async ({ event, resolve }) => {
    if (!PUBLIC_PB_URL) {
        error(500, {
            message: "Missing REQUIRED Environment Variable PUBLIC_PB_URL",
        })
    }

    event.locals.pb = new PocketBase(PUBLIC_PB_URL)
    event.locals.pb.authStore.loadFromCookie(
        event.request.headers.get("cookie") || "",
    )

    if (event.locals.pb.authStore.isValid) {
        try {
            event.locals.loggedInUser = (
                await event.locals.pb.collection("users").authRefresh()
            ).record
        } catch (e) {
            pbHandleError(e, (e) => {
                if (e.status !== 401) return
                event.locals.pb.authStore.clear()
                return "skip"
            })
        }
    }

    try {
        const previewTierId = (
            await event.locals.pb.collection("tiers").getFullList({
                filter: 'price = 0 && invites = 0 && visibility = "public"',
            })
        )?.[0]?.id
        event.locals.previewTierId = previewTierId
    } catch (e) {
        pbHandleError(e)
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

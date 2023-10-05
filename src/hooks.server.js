import PocketBase from "pocketbase"
import { POCKETBASE_URL } from "$env/static/private"
import { handlePbConnectionIssue } from "$utils/handlePbConnectionIssue.js"

export async function handle({ event, resolve }) {
    if (!POCKETBASE_URL)
        throw new Error("Missing required Environment Variables!")

    event.locals.pb = new PocketBase(POCKETBASE_URL)
    event.locals.pb.authStore.loadFromCookie(
        event.request.headers.get("cookie") || ""
    )

    event.locals.user = event.locals.pb.authStore.isValid
        ? event.locals.pb.authStore.model
        : null

    if (event.locals.user) {
        try {
            const newestData = await event.locals.pb
                .collection("users")
                .authRefresh()
            event.locals.user = newestData.record
        } catch (error) {
            handlePbConnectionIssue(error.status)

            if (error.response.code === 401) {
                event.locals.pb.authStore.clear()
                event.locals.user = null
            } else {
                throw error
            }
        }
    }

    const response = await resolve(event)

    response.headers.set(
        "set-cookie",
        event.locals.pb.authStore.exportToCookie({
            secure: false,
            httpOnly: false,
        })
    )

    return response
}

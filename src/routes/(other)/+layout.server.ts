import { redirect } from "@sveltejs/kit"
import { pbHandleClientResponseError } from "$utilities/pb"
import type {
    ListResultMessagesResponse,
    ListResultEventsResponse,
    ClientResponseError,
} from "$utilities/pb-types"

export async function load({ locals, parent }) {
    if (!locals.user) throw redirect(303, "/login")

    try {
        const messages: ListResultMessagesResponse = await locals.pb
            .collection("messages")
            .getList(1, 50, {
                sort: "-created",
                expand: "user,repliedTo,repliedTo.user",
            })
        const events: ListResultEventsResponse = await locals.pb
            .collection("events")
            .getList(1, 50, {
                sort: "-created",
                expand: "user,user.retainedTiers,inviter,inviter.retainedTiers",
            })

        return {
            ...(await parent()),
            user: locals.user, // Note: Yes, `locals.user` is not `null` after the `if` statment, however we are uisng `data` and `user` is `null` inside it!
            messages,
            events,
        }
    } catch (e) {
        pbHandleClientResponseError(e as ClientResponseError)
        throw e
    }
}

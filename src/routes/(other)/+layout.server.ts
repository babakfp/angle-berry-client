import { redirect } from "@sveltejs/kit"
import { pbHandleClientResponseError } from "$utilities/pb"
import {
    type ListResultEventsResponse,
    ClientResponseError,
    type ListResult,
    type RealtimeMessagesResponse,
} from "$utilities/pb-types"

export const load = async ({ locals, parent }) => {
    if (!locals.user) redirect(303, "/login")

    try {
        const messages: ListResult<RealtimeMessagesResponse> = await locals.pb
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
        if (e instanceof ClientResponseError) {
            pbHandleClientResponseError(e)
        }
        throw e
    }
}

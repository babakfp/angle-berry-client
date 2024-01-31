import { redirect } from "@sveltejs/kit"
import { pbHandleClientResponseError } from "$utilities/pb"
import {
    ClientResponseError,
    type ListResult,
    type RealtimeEventsResponse,
    type RealtimeMessagesResponse,
    type TiersResponse,
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
        const events: ListResult<RealtimeEventsResponse> = await locals.pb
            .collection("events")
            .getList(1, 50, {
                sort: "-created",
                expand: "user,user.retainedTiers,inviter,inviter.retainedTiers",
            })
        const tiers: TiersResponse[] = await locals.pb
            .collection("tiers")
            .getFullList()

        return {
            ...(await parent()),
            user: locals.user, // Note: Yes, `locals.user` is not `undefined` after the `if` statment, however we are uisng `data` and `user` is `undefined` inside it!
            messages,
            events,
            tiers,
        }
    } catch (e) {
        if (e instanceof ClientResponseError) {
            pbHandleClientResponseError(e)
        }
        throw e
    }
}

import { pbHandleClientResponseError } from "@/lib/utilities/pb/helpers"
import {
    ClientResponseError,
    type ListResult,
    type RealtimeEventsResponse,
    type RealtimeMessagesResponse,
    type TiersResponse,
} from "@/lib/utilities/pb/types"
import { redirect } from "@sveltejs/kit"

export const load = async ({ locals }) => {
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
            .getFullList({ filter: 'visibility = "public"' })

        return {
            user: locals.user,
            previewTierId: locals.previewTierId,
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

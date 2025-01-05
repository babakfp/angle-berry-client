import { redirect } from "@sveltejs/kit"
import {
    ClientResponseError,
    pbHandleClientResponseError,
    TIERS_RECORD_VISIBILITY_OPTIONS,
    type RealtimeEventsResponse,
    type RealtimeMessagesResponse,
    type TiersResponse,
} from "$lib/utilities/pb"

export const load = async ({ locals }) => {
    if (!locals.loggedInUser) redirect(303, "/login")

    try {
        const [messages, events, tiers] = await Promise.all([
            locals.pb
                .collection("messages")
                .getList<RealtimeMessagesResponse>(1, 50, {
                    sort: "-created",
                    expand: "user,repliedTo,repliedTo.user",
                }),
            locals.pb
                .collection("events")
                .getList<RealtimeEventsResponse>(1, 50, {
                    sort: "-created",
                    expand: "user,user.retainedTiers,inviter,inviter.retainedTiers",
                }),
            locals.pb.collection("tiers").getFullList<
                TiersResponse & {
                    visibility: typeof TIERS_RECORD_VISIBILITY_OPTIONS.public
                }
            >({ filter: 'visibility = "public"' }),
        ])

        return {
            loggedInUser: locals.loggedInUser,
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

import { redirect } from "@sveltejs/kit"
import {
    pbHandleError,
    TIERS_RECORD_VISIBILITY_OPTIONS,
    type RealtimeEventsResponse,
    type RealtimeMessagesResponse,
    type TiersResponse,
} from "$lib/utilities/pb"
import type { LayoutServerLoad } from "./$types"

export const load: LayoutServerLoad = async ({ locals }) => {
    if (!locals.loggedInUser) {
        redirect(401, "/login")
    }

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
        pbHandleError(e)
    }
}

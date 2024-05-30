import { redirect } from "@sveltejs/kit"
import { pbHandleClientResponseError } from "@/utilities/pb/helpers"
import {
    ClientResponseError,
    TiersVisibilityOptions,
    type RealtimeEventsResponse,
    type RealtimeMessagesResponse,
    type TiersResponse,
} from "@/utilities/pb/types"

export const load = async ({ locals }) => {
    if (!locals.loggedInUser) redirect(303, "/login")

    try {
        const messages = await locals.pb
            .collection("messages")
            .getList<RealtimeMessagesResponse>(1, 50, {
                sort: "-created",
                expand: "user,repliedTo,repliedTo.user",
            })
        const events = await locals.pb
            .collection("events")
            .getList<RealtimeEventsResponse>(1, 50, {
                sort: "-created",
                expand: "user,user.retainedTiers,inviter,inviter.retainedTiers",
            })
        const tiers = await locals.pb.collection("tiers").getFullList<
            TiersResponse & {
                visibility: Exclude<
                    TiersVisibilityOptions,
                    TiersVisibilityOptions.private
                >
            }
        >({ filter: 'visibility = "public"' })

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

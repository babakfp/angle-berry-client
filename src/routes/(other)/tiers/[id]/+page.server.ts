import { pbHandleClientResponseError } from "@/lib/utilities/pb/helpers"
import {
    ClientResponseError,
    type TiersResponse,
    type VideosResponse,
} from "@/lib/utilities/pb/types"
import { redirect } from "@sveltejs/kit"

export const load = async ({ locals, params }) => {
    if (!locals.user) redirect(303, "/login")

    try {
        const tier: TiersResponse & {
            expand?: {
                videos: VideosResponse[]
            }
        } = await locals.pb
            .collection("tiers")
            .getOne(params.id, { expand: "videos" })

        const isTierAccessed =
            params.id === locals.previewTierId ||
            locals.user.retainedTiers.includes(params.id) ||
            locals.user.invitedUsers.length >= tier.invites

        if (!isTierAccessed) {
            tier.expand?.videos.map((video) => (video.file = ""))
        }

        return {
            isTierAccessed,
            tier,
        }
    } catch (e) {
        if (e instanceof ClientResponseError) {
            pbHandleClientResponseError(e)
        }
        throw e
    }
}

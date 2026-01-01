import { redirect } from "@sveltejs/kit"
import {
    pbHandleError,
    type TiersResponse,
    type VideosResponse,
} from "$lib/utilities/pb"
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async ({ locals, params }) => {
    if (!locals.loggedInUser) {
        redirect(303, "/login")
    }

    try {
        const tier: TiersResponse & {
            expand?: {
                videos: VideosResponse[]
            }
        } = await locals.pb
            .collection("tiers")
            .getOne(params.id, { expand: "videos" })

        const isTierAccessed =
            params.id === locals.previewTierId
            || locals.loggedInUser.retainedTiers.includes(params.id)
            || locals.loggedInUser.invitedUsers.length >= tier.invites

        if (!isTierAccessed) {
            tier.expand?.videos.map((video) => (video.file = ""))
        }

        return {
            isTierAccessed,
            tier,
        }
    } catch (e) {
        pbHandleError(e)
    }
}

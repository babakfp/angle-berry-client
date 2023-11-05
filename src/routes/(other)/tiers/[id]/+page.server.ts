import { redirect } from "@sveltejs/kit"
import { pbHandleClientResponseError } from "$utilities/pb"
import type { ClientResponseError } from "pocketbase"
import type { TiersResponse, VideosResponse } from "$utilities/pb-types"

export async function load({ locals, params }) {
    if (!locals.user) throw redirect(303, "/login")

    try {
        const tier: TiersResponse & {
            expand?: {
                videos: VideosResponse[]
            }
        } = await locals.pb
            .collection("tiers")
            .getOne(params.id, { expand: "videos" })

        let tierAccessGranted =
            params.id === locals.previewTierId ||
            locals.user.retainedTiers.includes(params.id) ||
            locals.user.invitedUsers.length >= tier.invites

        if (!tierAccessGranted) {
            tier.expand?.videos.map(video => (video.file = ""))
        }

        return {
            tierAccessGranted,
            tier,
        }
    } catch (e) {
        pbHandleClientResponseError(e as ClientResponseError)
        throw e
    }
}

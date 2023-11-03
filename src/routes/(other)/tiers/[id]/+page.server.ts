import { pbHandleClientResponseError } from "$utilities/pb"
import type { ClientResponseError } from "pocketbase"
import type { TiersResponse, VideosResponse } from "$utilities/pb-types"

export async function load({ locals, params }) {
    try {
        const tier: TiersResponse & { expand: { videos: VideosResponse[] } } =
            await locals.pb
                .collection("tiers")
                .getOne(params.id, { expand: "videos" })
        if (
            params.id === locals.previewTierId ||
            locals.user.retainedTiers.includes(params.id) ||
            locals.user.invitedUsers.length >= tier.invites
        ) {
            return {
                hasAccessToThisTier: true,
                tier,
            }
        } else {
            delete tier.file
            return {
                hasAccessToThisTier: false,
                tier,
            }
        }
    } catch (e) {
        pbHandleClientResponseError(e as ClientResponseError)
        throw e
    }
}

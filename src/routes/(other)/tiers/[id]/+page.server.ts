import { pbHandleClientResponseError } from "$utilities/pb"
import type { ClientResponseError } from "pocketbase"

export async function load({ locals, params }) {
    try {
        const record = await locals.pb.collection("tiers").getOne(params.id, {
            expand: "videos",
        })
        if (record) {
            const tier = record
            if (
                params.id === locals.previewTierId ||
                locals.user.retainedTiers.includes(params.id) ||
                locals.user.invitedUsers.length >= tier.invites
            ) {
                return {
                    hasAccessToThisTier: true,
                    tier: record,
                }
            } else {
                delete tier.file
                return {
                    hasAccessToThisTier: false,
                    tier: record,
                }
            }
        }
    } catch (e) {
        pbHandleClientResponseError(e as ClientResponseError)
    }
}

import { error } from "@sveltejs/kit"
import { handleCommunicationFailure } from "$utilities/pb/helpers.js"

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
    } catch ({ status, response }) {
        handleCommunicationFailure(status)
        if (status === 404) throw error(404)
        throw error(status, response.message)
    }
}

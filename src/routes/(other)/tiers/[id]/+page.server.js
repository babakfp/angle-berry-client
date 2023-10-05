import { error } from "@sveltejs/kit"
import { handlePbConnectionIssue } from "$utils/handlePbConnectionIssue.js"
import { getPreviewTierId } from "$utils/previewTier.js"

export async function load({ locals, params }) {
    try {
        const record = await locals.pb.collection("tiers").getOne(params.id, {
            expand: "videos",
        })
        if (record) {
            const tier = record
            if (
                params.id === getPreviewTierId() ||
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
        handlePbConnectionIssue(status)
        if (status === 404) throw error(404)
        throw error(status, response.message)
    }
}

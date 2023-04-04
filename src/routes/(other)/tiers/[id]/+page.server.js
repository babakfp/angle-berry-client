import { error } from "@sveltejs/kit"
import { previewTierId } from "$stores/previewTierId.js"
import { handlePbConnectionIssue } from "$utils/handlePbConnectionIssue.js"

export async function load({ locals, params }) {
	try {
		const record = await locals.pb.collection("tiers").getOne(params.id, {
			expand: "videos",
		})
		if (record) {
			const tier = structuredClone(record)
			if (
				params.id === previewTierId ||
				locals.user.retainedTiers.includes(params.id) ||
				locals.user.invitedUsers.length >= tier.invites
			) {
				return {
					hasAccessToThisTier: true,
					tier: structuredClone(record),
				}
			} else {
				delete tier.file
				return {
					hasAccessToThisTier: false,
					tier: structuredClone(record),
				}
			}
		}
	} catch ({ status, response }) {
		handlePbConnectionIssue(status)
		if (status === 404) throw error(404)
		throw error(status, response.message)
	}
}

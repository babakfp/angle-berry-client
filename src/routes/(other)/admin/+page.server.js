import { error } from "@sveltejs/kit"
import { handleOfflineFailure } from "$utilities/pb.js"

export async function load({ locals, params }) {
    try {
        const tiers = await locals.pb.collection("tiers").getFullList()
        const users = await locals.pb.collection("users").getFullList()
        return { tiers, users }
    } catch ({ status, response }) {
        handleOfflineFailure(status)
        throw error(status, response.message)
    }
}

import { error } from "@sveltejs/kit"
import { handleOfflineFailure } from "$utilities/pb"

export async function load({ locals }) {
    try {
        const users = await locals.pb.collection("users").getFullList()
        return { users }
    } catch ({ status, response }) {
        handleOfflineFailure(status)
        throw error(status, response.message)
    }
}

import { error } from "@sveltejs/kit"
import { handleOfflineFailure } from "$utilities/pb.js"

export async function load({ locals, params }) {
    try {
        const tier = await locals.pb.collection("tiers").getOne(params.id)
        const videos = await locals.pb.collection("videos").getFullList()
        return { tier, videos }
    } catch ({ status, response }) {
        handleOfflineFailure(status)
        if (status === 404) throw error(404)
        throw error(status, response.message)
    }
}

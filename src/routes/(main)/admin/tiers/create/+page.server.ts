import { redirect } from "@sveltejs/kit"
import { pbHandleError } from "$lib/utilities/pb"
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async ({ locals }) => {
    if (!locals.loggedInUser) {
        redirect(401, "/login")
    }
    if (!locals.loggedInUser.isAdmin) {
        redirect(401, "/")
    }

    try {
        const videos = await locals.pb.collection("videos").getFullList()
        return { videos }
    } catch (e) {
        pbHandleError(e)
    }
}

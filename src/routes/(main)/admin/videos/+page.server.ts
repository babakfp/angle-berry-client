import { error, redirect } from "@sveltejs/kit"
import {
    ClientResponseError,
    pbHandleClientResponseError,
} from "$lib/utilities/pb"
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async ({ locals }) => {
    if (!locals.loggedInUser) redirect(303, "/login")
    if (!locals.loggedInUser.isAdmin)
        error(401, "You are not authorized to see this page!")

    try {
        const videos = await locals.pb.collection("videos").getFullList()

        return { videos }
    } catch (e) {
        if (e instanceof ClientResponseError) {
            pbHandleClientResponseError(e)
        }
        throw e
    }
}

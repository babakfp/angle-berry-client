import { redirect } from "@sveltejs/kit"
import { getRequestEvent, query } from "$app/server"
import { pbHandleError } from "$lib/utilities/pb"

export const loadAllVideos = query(async () => {
    const { locals } = getRequestEvent()

    if (!locals.loggedInUser) {
        redirect(303, "/login")
    }
    if (!locals.loggedInUser.isAdmin) {
        redirect(303, "/")
    }

    try {
        return await locals.pb.collection("videos").getFullList()
    } catch (e) {
        throw pbHandleError(e)
    }
})

import { redirect } from "@sveltejs/kit"
import { getRequestEvent, query } from "$app/server"
import { pbHandleError } from "$lib/utilities/pb"

export const loadVideos = query(async () => {
    const { locals } = getRequestEvent()

    if (!locals.loggedInUser) {
        redirect(401, "/login")
    }
    if (!locals.loggedInUser.isAdmin) {
        redirect(401, "/")
    }

    try {
        return await locals.pb.collection("videos").getFullList()
    } catch (e) {
        throw pbHandleError(e)
    }
})

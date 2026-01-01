import { redirect } from "@sveltejs/kit"
import { form, getRequestEvent, query } from "$app/server"
import { pbHandleError, pbInvalid } from "$lib/utilities/pb"
import { schema } from "../schema"

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

export const createTier = form(schema.create, async (data, issue) => {
    const { locals } = getRequestEvent()

    if (!locals.loggedInUser) {
        redirect(401, "/login")
    }
    if (!locals.loggedInUser.isAdmin) {
        redirect(401, "/")
    }

    try {
        await locals.pb.collection("tiers").create(data)
    } catch (e) {
        pbInvalid(e, issue)
    }

    return {
        redirect: "/admin/tiers",
    } as const
})

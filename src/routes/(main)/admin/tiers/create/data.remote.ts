import { redirect } from "@sveltejs/kit"
import { form, getRequestEvent } from "$app/server"
import { pbInvalid } from "$lib/utilities/pb"
import { schema } from "../schema"

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

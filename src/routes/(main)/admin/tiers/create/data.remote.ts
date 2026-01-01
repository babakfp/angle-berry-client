import { invalid } from "@sveltejs/kit"
import { form, getRequestEvent } from "$app/server"
import { pbInvalid } from "$lib/utilities/pb"
import { schema } from "../schema"

export const createTier = form(schema.create, async (data, issue) => {
    const { locals } = getRequestEvent()

    if (!locals.loggedInUser) {
        invalid("You are not logged in!")
    }
    if (!locals.loggedInUser.isAdmin) {
        invalid("You are not an admin!")
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

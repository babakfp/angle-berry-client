import { error, redirect } from "@sveltejs/kit"
import { resolve } from "$app/paths"
import { form, getRequestEvent } from "$app/server"
import { pbInvalid } from "$lib/utilities/pb"
import { schema } from "../schema"

export const createTier = form(schema.create, async (data, issue) => {
    const { locals } = getRequestEvent()

    if (!locals.loggedInUser) {
        redirect(401, resolve("/login"))
    }
    if (!locals.loggedInUser.isAdmin) {
        error(401, "You are not authorized to perform this action!")
    }

    try {
        await locals.pb.collection("tiers").create(data)
    } catch (e) {
        pbInvalid(e, issue)
    }

    return {
        redirect: resolve("/admin/tiers"),
    } as const
})

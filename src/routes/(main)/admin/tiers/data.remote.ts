import { error, redirect } from "@sveltejs/kit"
import { resolve } from "$app/paths"
import { form, getRequestEvent } from "$app/server"
import { pbInvalid } from "$lib/utilities/pb"
import { schema } from "./schema"

export const deleteTiers = form(schema.delete.multiple, async (data, issue) => {
    const { locals } = getRequestEvent()

    if (!locals.loggedInUser) {
        redirect(303, resolve("/login"))
    }
    if (!locals.loggedInUser.isAdmin) {
        error(401, "You are not authorized to perform this action!")
    }

    try {
        await Promise.all(
            data.ids.map((id) => locals.pb.collection("tiers").delete(id)),
        )
    } catch (e) {
        pbInvalid(e, issue)
    }
})

import { redirect } from "@sveltejs/kit"
import { resolve } from "$app/paths"
import { form, getRequestEvent } from "$app/server"
import { pbInvalid } from "$lib/utilities/pb"
import { schema } from "./schema"

export const deleteTiers = form(schema.delete.multiple, async (data, issue) => {
    const { locals } = getRequestEvent()

    if (!locals.loggedInUser) {
        redirect(401, resolve("/login"))
    }
    if (!locals.loggedInUser.isAdmin) {
        redirect(401, resolve("/"))
    }

    try {
        await Promise.all(
            data.ids.map((id) => locals.pb.collection("tiers").delete(id)),
        )
    } catch (e) {
        pbInvalid(e, issue)
    }
})

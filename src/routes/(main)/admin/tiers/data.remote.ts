import { redirect } from "@sveltejs/kit"
import { form, getRequestEvent, query } from "$app/server"
import { pbHandleError, pbInvalid } from "$lib/utilities/pb"
import { schema } from "./schema"

export const loadUsers = query(async () => {
    const { locals } = getRequestEvent()

    if (!locals.loggedInUser) {
        redirect(401, "/login")
    }
    if (!locals.loggedInUser.isAdmin) {
        redirect(401, "/")
    }

    try {
        return await locals.pb.collection("users").getFullList()
    } catch (e) {
        throw pbHandleError(e)
    }
})

export const deleteTiers = form(schema.delete.multiple, async (data, issue) => {
    const { locals } = getRequestEvent()

    if (!locals.loggedInUser) {
        redirect(401, "/login")
    }
    if (!locals.loggedInUser.isAdmin) {
        redirect(401, "/")
    }

    try {
        await Promise.all(
            data.ids.map((id) => locals.pb.collection("tiers").delete(id)),
        )
    } catch (e) {
        pbInvalid(e, issue)
    }
})

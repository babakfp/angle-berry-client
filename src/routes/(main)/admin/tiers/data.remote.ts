import { error, invalid, redirect } from "@sveltejs/kit"
import { form, getRequestEvent } from "$app/server"
import { pbInvalid } from "$lib/utilities/pb"
import { schema } from "./schema"

export const deleteTier = form(schema.delete.multiple, async (data, issue) => {
    const { locals, params } = getRequestEvent()

    if (!locals.loggedInUser) redirect(303, "/login")
    if (!locals.loggedInUser.isAdmin)
        error(401, "You are not authorized to perform this action!")

    // TODO: get userid from schema insetad of params?
    const tierId = params.id

    if (!tierId) {
        invalid("User ID is required!")
    }

    try {
        await Promise.all(
            data.ids.map((id) => locals.pb.collection("tiers").delete(id)),
        )
    } catch (e) {
        pbInvalid(e, issue)
    }
})

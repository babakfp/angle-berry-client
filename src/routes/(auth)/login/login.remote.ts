import { redirect } from "@sveltejs/kit"
import { form, getRequestEvent } from "$app/server"
import { pbInvalid } from "$lib/utilities/pb"
import { schema } from "../(lib)/schema"

export const login = form(schema, async (data, issue) => {
    const { locals } = getRequestEvent()

    if (locals.loggedInUser) {
        redirect(303, "/")
    }

    try {
        await locals.pb
            .collection("users")
            .authWithPassword(data.username, data.password)
    } catch (e) {
        pbInvalid(e, issue)
    }

    if (locals.previewTierId) {
        return {
            redirect: `/tiers/${locals.previewTierId}`,
        }
    }

    return {
        redirect: "/",
    }
})

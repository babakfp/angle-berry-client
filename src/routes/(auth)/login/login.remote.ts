import { invalid } from "@sveltejs/kit"
import { form, getRequestEvent } from "$app/server"
import { pbInvalid } from "$lib/utilities/pb"
import { schema } from "../(lib)/schema"

export const login = form(schema, async (data, issue) => {
    const { locals } = getRequestEvent()

    if (locals.loggedInUser) {
        invalid("You are already logged in!")
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
        } as const
    }

    return {
        redirect: "/",
    } as const
})

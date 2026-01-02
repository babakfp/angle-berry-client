import { redirect } from "@sveltejs/kit"
import { getRequestEvent, query } from "$app/server"

export const getLoggedInUser = query(() => {
    const { locals } = getRequestEvent()

    if (!locals.loggedInUser) {
        redirect(303, "/login")
    }

    return locals.loggedInUser
})

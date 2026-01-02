import { redirect } from "@sveltejs/kit"
import { getRequestEvent, query } from "$app/server"

export const allowNonLoggedInOnly = query(() => {
    const { locals } = getRequestEvent()
    if (!locals.loggedInUser) return
    redirect(303, "/")
})

import { redirect } from "@sveltejs/kit"
import { form, getRequestEvent } from "$app/server"

export const logout = form("unchecked", async () => {
    const { locals } = getRequestEvent()

    locals.pb.authStore.clear()
    locals.loggedInUser = undefined

    redirect(303, "/login")
})

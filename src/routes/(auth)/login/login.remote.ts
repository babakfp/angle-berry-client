import { invalid, redirect } from "@sveltejs/kit"
import { form, getRequestEvent } from "$app/server"
import { ClientResponseError } from "$lib/utilities/pb"
import { AuthSchema } from "../(lib)/schema"

export const login = form(AuthSchema, async (data, issue) => {
    const { locals } = getRequestEvent()

    if (locals.loggedInUser) {
        redirect(303, "/")
    }

    try {
        await locals.pb
            .collection("users")
            .authWithPassword(data.username, data.password)
    } catch (e) {
        if (!(e instanceof ClientResponseError)) {
            invalid("Something went wrong!")
        }
        if (e.response.status === 0) {
            invalid("Database communication failure!")
        }

        const d: {
            identity?: { message?: string }
            username?: { message?: string }
            password?: { message?: string }
        } = e.response.data

        if (d.identity?.message) {
            invalid(issue.username(d.identity.message))
        }
        if (d.username?.message) {
            invalid(issue.username(d.username.message))
        }
        if (d.password?.message) {
            invalid(issue.password(d.password.message))
        }

        invalid(e.response.message)
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

import { redirect } from "@sveltejs/kit"
import { resolve } from "$app/paths"

export const GET = ({ locals }) => {
    if (locals.loggedInUser) {
        redirect(303, resolve("/"))
    }
    redirect(303, resolve("/login"))
}

export const POST = ({ locals }) => {
    if (locals.loggedInUser) {
        locals.pb.authStore.clear()
        locals.loggedInUser = undefined
    }
    redirect(303, resolve("/login"))
}

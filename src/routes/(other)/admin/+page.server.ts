import { redirect, error } from "@sveltejs/kit"

export async function load({ locals }) {
    if (!locals.user) redirect(303, "/login")
    if (!locals.user.isAdmin)
        error(401, "You are not authorized to see this page!")
    return {}
}

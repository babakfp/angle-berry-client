import { redirect, error } from "@sveltejs/kit"

export async function load({ locals, parent }) {
    if (!locals.user) throw redirect(303, "/login")
    if (!locals.user.isAdmin)
        throw error(401, "You are not authorized to see this page!")
    await parent()
}

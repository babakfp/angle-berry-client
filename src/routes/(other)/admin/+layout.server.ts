import { error } from "@sveltejs/kit"

export async function load({ locals }) {
    if (!locals.user.isAdmin)
        throw error(401, "You are not authorized to see this page!")
}

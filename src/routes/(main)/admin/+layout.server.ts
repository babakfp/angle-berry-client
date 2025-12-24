import { error, redirect } from "@sveltejs/kit"
import type { LayoutServerLoad } from "./$types"

export const load: LayoutServerLoad = async ({ locals }) => {
    if (!locals.loggedInUser) redirect(303, "/login")
    if (!locals.loggedInUser.isAdmin)
        error(401, "You are not authorized to see this page!")
}

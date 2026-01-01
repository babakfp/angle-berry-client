import { redirect } from "@sveltejs/kit"
import type { LayoutServerLoad } from "./$types"

export const load: LayoutServerLoad = async ({ locals }) => {
    if (!locals.loggedInUser) {
        redirect(401, "/login")
    }
    if (!locals.loggedInUser.isAdmin) {
        redirect(401, "/")
    }
}

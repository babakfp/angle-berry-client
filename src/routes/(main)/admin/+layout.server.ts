import { redirect } from "@sveltejs/kit"
import { resolve } from "$app/paths"
import type { LayoutServerLoad } from "./$types"

export const load: LayoutServerLoad = async ({ locals }) => {
    if (!locals.loggedInUser) {
        redirect(401, resolve("/login"))
    }
    if (!locals.loggedInUser.isAdmin) {
        redirect(401, resolve("/"))
    }
}

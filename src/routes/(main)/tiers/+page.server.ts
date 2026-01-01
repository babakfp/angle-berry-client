import { redirect } from "@sveltejs/kit"
import { resolve } from "$app/paths"
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = ({ locals }) => {
    if (!locals.loggedInUser) {
        redirect(401, resolve("/login"))
    }
    redirect(303, resolve("/"))
}

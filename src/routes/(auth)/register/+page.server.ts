import { redirect } from "@sveltejs/kit"
import { resolve } from "$app/paths"
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async ({ locals }) => {
    if (!locals.loggedInUser) return
    redirect(303, resolve("/"))
}

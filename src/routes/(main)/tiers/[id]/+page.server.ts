import { redirect } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async ({ locals, params }) => {
    if (!locals.loggedInUser) {
        redirect(303, "/login")
    }
}

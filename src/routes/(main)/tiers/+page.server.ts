import { redirect } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = ({ locals }) => {
    if (!locals.loggedInUser) {
        redirect(303, "/login")
    }
    redirect(303, "/")
}

import { redirect } from "@sveltejs/kit"
import type { LayoutServerLoad } from "./$types"

export const load: LayoutServerLoad = ({ locals }) => {
    if (!locals.loggedInUser) return
    redirect(303, "/")
}

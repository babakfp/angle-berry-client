import { redirect } from "@sveltejs/kit"
import { pbHandleError } from "$lib/utilities/pb"
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async ({ locals }) => {
    if (!locals.loggedInUser) {
        redirect(401, "/login")
    }
    if (!locals.loggedInUser.isAdmin) {
        redirect(401, "/")
    }

    try {
        const users = await locals.pb.collection("users").getFullList()
        return { users }
    } catch (e) {
        pbHandleError(e)
    }
}

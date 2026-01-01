import { redirect } from "@sveltejs/kit"
import { pbHandleError } from "$lib/utilities/pb"
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async ({ locals, params }) => {
    if (!locals.loggedInUser) {
        redirect(401, "/login")
    }
    if (!locals.loggedInUser.isAdmin) {
        redirect(401, "/")
    }

    try {
        const targetUser = await locals.pb.collection("users").getOne(params.id)
        return { targetUser }
    } catch (e) {
        throw pbHandleError(e)
    }
}

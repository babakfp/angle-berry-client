import { error, redirect } from "@sveltejs/kit"
import { resolve } from "$app/paths"
import { pbHandleError } from "$lib/utilities/pb"
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async ({ locals, params }) => {
    if (!locals.loggedInUser) {
        redirect(401, resolve("/login"))
    }
    if (!locals.loggedInUser.isAdmin) {
        error(401, "You are not authorized to see this page!")
    }

    try {
        const targetUser = await locals.pb.collection("users").getOne(params.id)
        return { targetUser }
    } catch (e) {
        pbHandleError(e)
    }
}

import { error, redirect } from "@sveltejs/kit"
import { resolve } from "$app/paths"
import { pbHandleError } from "$lib/utilities/pb"
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async ({ locals }) => {
    if (!locals.loggedInUser) {
        redirect(303, resolve("/login"))
    }
    if (!locals.loggedInUser.isAdmin) {
        error(401, "You are not authorized to see this page!")
    }

    try {
        const [tiers, users] = await Promise.all([
            locals.pb
                .collection("tiers")
                .getFullList({ requestKey: "tiers-get-full-list" }),
            locals.pb.collection("users").getFullList(),
        ])
        return { tiers, users }
    } catch (e) {
        pbHandleError(e)
    }
}

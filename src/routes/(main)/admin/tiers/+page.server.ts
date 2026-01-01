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
        const [tiers, users] = await Promise.all([
            locals.pb
                .collection("tiers")
                .getFullList({ requestKey: "tiers-get-full-list" }),
            locals.pb.collection("users").getFullList(),
        ])
        return { tiers, users }
    } catch (e) {
        throw pbHandleError(e)
    }
}

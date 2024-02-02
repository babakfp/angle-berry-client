import { redirect, error } from "@sveltejs/kit"
import { type UsersResponse, ClientResponseError } from "$utilities/pb/types"
import { pbHandleClientResponseError } from "$utilities/pb/helpers"

export const load = async ({ locals }) => {
    if (!locals.user) redirect(303, "/login")
    if (!locals.user.isAdmin)
        error(401, "You are not authorized to see this page!")

    try {
        const users: UsersResponse[] = await locals.pb
            .collection("users")
            .getFullList()
        return { users }
    } catch (e) {
        if (e instanceof ClientResponseError) {
            pbHandleClientResponseError(e)
        }
        throw e
    }
}

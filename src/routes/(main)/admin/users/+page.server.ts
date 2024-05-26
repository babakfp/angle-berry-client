import { pbHandleClientResponseError } from "@/lib/utilities/pb/helpers"
import {
    ClientResponseError,
    type UsersResponse,
} from "@/lib/utilities/pb/types"
import { error, redirect } from "@sveltejs/kit"

export const load = async ({ locals }) => {
    if (!locals.loggedInUser) redirect(303, "/login")
    if (!locals.loggedInUser.isAdmin)
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

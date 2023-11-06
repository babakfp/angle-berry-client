import { redirect, error } from "@sveltejs/kit"
import { pbHandleClientResponseError } from "$utilities/pb"
import type { ClientResponseError } from "$utilities/pb-types"

export async function load({ locals }) {
    if (!locals.user) throw redirect(303, "/login")
    if (!locals.user.isAdmin)
        throw error(401, "You are not authorized to see this page!")

    try {
        return {}
    } catch (e) {
        pbHandleClientResponseError(e as ClientResponseError)
        throw e
    }
}

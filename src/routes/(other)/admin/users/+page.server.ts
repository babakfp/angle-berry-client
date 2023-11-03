import type { UsersRecord } from "$utilities/pb-types"
import { pbHandleClientResponseError } from "$utilities/pb"
import type { ClientResponseError } from "pocketbase"

export async function load({ locals }) {
    try {
        const users: UsersRecord[] = await locals.pb
            .collection("users")
            .getFullList()
        return { users }
    } catch (e) {
        pbHandleClientResponseError(e as ClientResponseError)
        throw e
    }
}

import { fail } from "@sveltejs/kit"
import {
    handleOfflineFailure,
    pbHandleClientResponseError,
} from "$utilities/pb"
import { superValidate } from "sveltekit-superforms/server"
import { tierDeletionSchema } from "./tiers/schema"
import type { TiersResponse, UsersResponse } from "$utilities/pb-types"
import type { ClientResponseError } from "pocketbase"

export async function load({ locals }) {
    const form = await superValidate(tierDeletionSchema)

    try {
        const tiers: TiersResponse[] = await locals.pb
            .collection("tiers")
            .getFullList()
        const users: UsersResponse[] = await locals.pb
            .collection("users")
            .getFullList()
        return { form, tiers, users }
    } catch (e) {
        pbHandleClientResponseError(e as ClientResponseError)
        throw e
    }
}

export const actions = {
    deletetier: async ({ locals, request }) => {
        const form = await superValidate(request, tierDeletionSchema)
        if (!form.valid) return fail(400, { form })

        const deletePromises = form.data.ids.map(id =>
            locals.pb.collection("tiers").delete(id),
        )

        try {
            await Promise.all(deletePromises)
        } catch ({ status, response }) {
            handleOfflineFailure(status)

            return fail(response.code, {
                form,
                message: response.message,
                data: response.data,
            })
        }
    },
}

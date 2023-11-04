import { redirect, error, fail } from "@sveltejs/kit"
import {
    pbHandleClientResponseError,
    pbHandleFormActionError,
} from "$utilities/pb"
import { superValidate } from "sveltekit-superforms/server"
import { tierDeletionSchema } from "./schema"
import type { TiersResponse, UsersResponse } from "$utilities/pb-types"
import type { ClientResponseError } from "pocketbase"

export async function load({ locals }) {
    if (!locals.user) throw redirect(303, "/login")
    if (!locals.user.isAdmin)
        throw error(401, "You are not authorized to see this page!")

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
        if (!locals.user) throw redirect(303, "/login")
        if (!locals.user.isAdmin)
            throw error(401, "You are not authorized to see this page!")

        const form = await superValidate(request, tierDeletionSchema)
        if (!form.valid) return fail(400, { form })

        const deletePromises = form.data.ids.map(id =>
            locals.pb.collection("tiers").delete(id),
        )

        try {
            await Promise.all(deletePromises)
        } catch (e) {
            const e2 = pbHandleFormActionError(e, form)
            if (e2) return e2
            throw e
        }
    },
}

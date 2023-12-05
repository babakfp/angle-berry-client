import { redirect, error, fail } from "@sveltejs/kit"
import {
    pbHandleClientResponseError,
    pbHandleFormActionError,
} from "$utilities/pb"
import { superValidate } from "sveltekit-superforms/server"
import { formSchemaDeleteTiers } from "./schema"
import type {
    TiersResponse,
    UsersResponse,
    ClientResponseError,
} from "$utilities/pb-types"

export async function load({ locals }) {
    if (!locals.user) throw redirect(303, "/login")
    if (!locals.user.isAdmin)
        throw error(401, "You are not authorized to see this page!")

    const form = await superValidate(formSchemaDeleteTiers)

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
            throw error(401, "You are not authorized to perform this action!")

        const form = await superValidate(request, formSchemaDeleteTiers)
        if (!form.valid) return fail(400, { form })

        try {
            await Promise.all(
                form.data.ids.map(id =>
                    locals.pb.collection("tiers").delete(id),
                ),
            )
        } catch (e) {
            const e2 = pbHandleFormActionError(e, form)
            if (e2) return e2
            throw e
        }
    },
}

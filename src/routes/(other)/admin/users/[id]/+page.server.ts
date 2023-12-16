import { redirect, error, fail } from "@sveltejs/kit"
import {
    pbHandleClientResponseError,
    pbHandleFormActionError,
} from "$utilities/pb"
import { superValidate } from "sveltekit-superforms/server"
import type {
    UsersResponse,
    TiersResponse,
    ClientResponseError,
} from "$utilities/pb-types"
import { schema } from "./schema"

export async function load({ locals, params }) {
    if (!locals.user) redirect(303, "/login")
    if (!locals.user.isAdmin)
        error(401, "You are not authorized to see this page!")

    const form = await superValidate(schema)

    try {
        const user: UsersResponse = await locals.pb
            .collection("users")
            .getOne(params.id)
        const tiers: TiersResponse[] = await locals.pb
            .collection("tiers")
            .getFullList()
        return { form, user, tiers }
    } catch (e) {
        pbHandleClientResponseError(e as ClientResponseError)
        throw e
    }
}

export const actions = {
    default: async ({ locals, request, params }) => {
        if (!locals.user) redirect(303, "/login")
        if (!locals.user.isAdmin)
            error(401, "You are not authorized to perform this action!")

        const form = await superValidate(request, schema)
        if (!form.valid) return fail(400, { form })

        try {
            await locals.pb.collection("users").update(params.id, form.data)
        } catch (e) {
            const e2 = pbHandleFormActionError(e, form)
            if (e2) return e2
            throw e
        }

        redirect(303, "/admin/users")
    },
}

import { error, fail, redirect } from "@sveltejs/kit"
import { superValidate } from "sveltekit-superforms/server"
import {
    pbHandleClientResponseError,
    pbHandleFormActionError,
} from "$utilities/pb/helpers"
import {
    ClientResponseError,
    type TiersResponse,
    type UsersResponse,
} from "$utilities/pb/types"
import { schema } from "./schema"

export const load = async ({ locals }) => {
    if (!locals.user) redirect(303, "/login")
    if (!locals.user.isAdmin)
        error(401, "You are not authorized to see this page!")

    const form = await superValidate(schema.delete.multiple)

    try {
        const tiers: TiersResponse[] = await locals.pb
            .collection("tiers")
            .getFullList()
        const users: UsersResponse[] = await locals.pb
            .collection("users")
            .getFullList()
        return { form, tiers, users }
    } catch (e) {
        if (e instanceof ClientResponseError) {
            pbHandleClientResponseError(e)
        }
        throw e
    }
}

export const actions = {
    delete: async ({ locals, request }) => {
        if (!locals.user) redirect(303, "/login")
        if (!locals.user.isAdmin)
            error(401, "You are not authorized to perform this action!")

        const form = await superValidate(request, schema.delete.multiple)
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

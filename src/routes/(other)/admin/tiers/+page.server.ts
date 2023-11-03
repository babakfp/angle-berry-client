import { fail, error } from "@sveltejs/kit"
import { handleOfflineFailure } from "$utilities/pb"
import { superValidate } from "sveltekit-superforms/server"
import { tierDeletionSchema } from "./schema"

export async function load({ locals }) {
    const form = await superValidate(tierDeletionSchema)

    try {
        const tiers = await locals.pb.collection("tiers").getFullList()
        const users = await locals.pb.collection("users").getFullList()
        return { form, tiers, users }
    } catch ({ status, response }) {
        handleOfflineFailure(status)
        throw error(status, response.message)
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
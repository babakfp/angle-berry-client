import { redirect, fail } from "@sveltejs/kit"
import { error } from "@sveltejs/kit"
import { handleOfflineFailure } from "$utilities/pb.js"
import { superValidate } from "sveltekit-superforms/server"
import { schema } from "../schema.js"

export async function load({ locals }) {
    const form = await superValidate(schema)

    try {
        const videos = await locals.pb.collection("videos").getFullList()
        return { form, videos }
    } catch ({ status, response }) {
        handleOfflineFailure(status)
        if (status === 404) throw error(404)
        throw error(status, response.message)
    }
}

export const actions = {
    default: async ({ locals, request }) => {
        const form = await superValidate(request, schema)
        if (!form.valid) return fail(400, { form })

        try {
            await locals.pb.collection("tiers").create(form.data)
        } catch ({ status, response }) {
            handleOfflineFailure(status)

            return fail(response.code, {
                form,
                message: response.message,
                data: response.data,
            })
        }

        throw redirect(303, "/admin/tiers")
    },
}

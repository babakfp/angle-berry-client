import { redirect, fail } from "@sveltejs/kit"
import { superValidate } from "sveltekit-superforms/server"
import { handleOfflineFailure } from "$utilities/pb"
import { schema } from "../schema"

export const load = async () => {
    const form = await superValidate(schema)
    return { form }
}

export const actions = {
    default: async ({ locals, request }) => {
        const form = await superValidate(request, schema)
        if (!form.valid) return fail(400, { form })

        try {
            await locals.pb
                .collection("users")
                .authWithPassword(form.data.username, form.data.password)
        } catch ({ status, response }) {
            handleOfflineFailure(status)

            response.data.identity = {
                value: form.data.username,
                ...(response.data.identity || {}),
            }

            return fail(response.code, {
                form,
                message: response.message,
                data: response.data,
            })
        }

        if (locals.previewTierId) {
            throw redirect(303, `/tiers/${locals.previewTierId}`)
        } else {
            throw redirect(303, "/")
        }
    },
}

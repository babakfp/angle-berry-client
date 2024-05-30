import { fail, redirect } from "@sveltejs/kit"
import { superValidate } from "sveltekit-superforms/server"
import { pbHandleFormActionError } from "@/utilities/pb/helpers"
import { schema } from "../(lib)/schema"

export const load = async ({ locals }) => {
    if (locals.loggedInUser) {
        redirect(303, "/")
    }

    return {
        form: await superValidate(schema),
    }
}

export const actions = {
    default: async ({ locals, request }) => {
        if (locals.loggedInUser) {
            redirect(303, "/")
        }

        const form = await superValidate(request, schema)

        if (!form.valid) {
            return fail(400, { form })
        }

        try {
            await locals.pb
                .collection("users")
                .authWithPassword(form.data.username, form.data.password)
        } catch (e) {
            const e2 = pbHandleFormActionError(e, form)
            if (e2) return e2
            throw e
        }

        if (locals.previewTierId) {
            redirect(303, `/tiers/${locals.previewTierId}`)
        }

        redirect(303, "/")
    },
}

import { error, fail, redirect } from "@sveltejs/kit"
import { superValidate } from "sveltekit-superforms/server"
import {
    pbHandleClientResponseError,
    pbHandleFormActionError,
} from "$lib/utilities/pb/helpers"
import { ClientResponseError } from "$lib/utilities/pb/types"
import { schema } from "../schema"

export const load = async ({ locals }) => {
    if (!locals.loggedInUser) redirect(303, "/login")
    if (!locals.loggedInUser.isAdmin)
        error(401, "You are not authorized to see this page!")

    const form = await superValidate(schema.create)

    try {
        const videos = await locals.pb.collection("videos").getFullList()
        return { form, videos }
    } catch (e) {
        if (e instanceof ClientResponseError) {
            pbHandleClientResponseError(e)
        }
        throw e
    }
}

export const actions = {
    default: async ({ locals, request }) => {
        if (!locals.loggedInUser) redirect(303, "/login")
        if (!locals.loggedInUser.isAdmin)
            error(401, "You are not authorized to perform this action!")

        const form = await superValidate(request, schema.create)

        if (!form.valid) {
            return fail(400, { form })
        }

        try {
            await locals.pb.collection("tiers").create(form.data)
        } catch (e) {
            const e2 = pbHandleFormActionError(e, form)
            if (e2) return e2
            throw e
        }

        redirect(303, "/admin/tiers")
    },
}

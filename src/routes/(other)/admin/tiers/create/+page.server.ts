import { error, fail, redirect } from "@sveltejs/kit"
import { superValidate } from "sveltekit-superforms/server"
import {
    pbHandleClientResponseError,
    pbHandleFormActionError,
} from "$utilities/pb/helpers"
import { ClientResponseError, type VideosResponse } from "$utilities/pb/types"
import { formSchemaCreateTier } from "../schema"

export const load = async ({ locals }) => {
    if (!locals.user) redirect(303, "/login")
    if (!locals.user.isAdmin)
        error(401, "You are not authorized to see this page!")

    const form = await superValidate(formSchemaCreateTier)

    try {
        const videos: VideosResponse[] = await locals.pb
            .collection("videos")
            .getFullList()
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
        if (!locals.user) redirect(303, "/login")
        if (!locals.user.isAdmin)
            error(401, "You are not authorized to perform this action!")

        const form = await superValidate(request, formSchemaCreateTier)
        if (!form.valid) return fail(400, { form })

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

import { redirect, error, fail } from "@sveltejs/kit"
import { handleOfflineFailure } from "$utilities/pb"
import { superValidate } from "sveltekit-superforms/server"
import { schema } from "../schema"
import type { TiersResponse, VideosResponse } from "$utilities/pb-types"

export async function load({ locals, params }) {
    if (!locals.user) throw redirect(303, "/login")
    if (!locals.user.isAdmin)
        throw error(401, "You are not authorized to see this page!")

    const form = await superValidate(schema)

    try {
        const tier: TiersResponse[] = await locals.pb
            .collection("tiers")
            .getOne(params.id)
        const videos: VideosResponse[] = await locals.pb
            .collection("videos")
            .getFullList()
        return { form, tier, videos }
    } catch ({ status, response }) {
        handleOfflineFailure(status)
        if (status === 404) throw error(404)
        throw error(status, response.message)
    }
}

export const actions = {
    default: async ({ locals, request, url, params }) => {
        if (!locals.user) throw redirect(303, "/login")
        if (!locals.user.isAdmin)
            throw error(401, "You are not authorized to see this page!")

        const form = await superValidate(request, schema)
        if (!form.valid) return fail(400, { form })

        try {
            await locals.pb.collection("tiers").update(params.id, form.data)
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

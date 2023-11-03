import { redirect, fail } from "@sveltejs/kit"
import { error } from "@sveltejs/kit"
import { handleOfflineFailure } from "$utilities/pb"
import { superValidate } from "sveltekit-superforms/server"
import { schema } from "../schema"
import type { TiersRecord, VideosResponse } from "$utilities/pb-types"

export async function load({ locals, params }) {
    const form = await superValidate(schema)

    try {
        const tier: TiersRecord[] = await locals.pb
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
    default: async ({ locals, request, url }) => {
        const form = await superValidate(request, schema)
        if (!form.valid) return fail(400, { form })

        let currentTierId = url.pathname.split("/").pop()

        try {
            await locals.pb.collection("tiers").update(currentTierId, form.data)
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

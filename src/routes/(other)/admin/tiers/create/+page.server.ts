import { redirect, fail } from "@sveltejs/kit"
import {
    handleOfflineFailure,
    pbHandleClientResponseError,
} from "$utilities/pb"
import { superValidate } from "sveltekit-superforms/server"
import { schema } from "../schema"
import type { VideosResponse } from "$utilities/pb-types"
import type { ClientResponseError } from "pocketbase"

export async function load({ locals }) {
    const form = await superValidate(schema)

    try {
        const videos: VideosResponse[] = await locals.pb
            .collection("videos")
            .getFullList()
        return { form, videos }
    } catch (e) {
        pbHandleClientResponseError(e as ClientResponseError)
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

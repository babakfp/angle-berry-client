import { error } from "@sveltejs/kit"
import { handleOfflineFailure } from "$utilities/pb.js"
import { superValidate } from "sveltekit-superforms/server"
import { schema } from "./schema.js"

export async function load({ locals, params }) {
    const form = await superValidate(schema)

    try {
        const tier = await locals.pb.collection("tiers").getOne(params.id)
        const videos = await locals.pb.collection("videos").getFullList()
        return { form, tier, videos }
    } catch ({ status, response }) {
        handleOfflineFailure(status)
        if (status === 404) throw error(404)
        throw error(status, response.message)
    }
}

export const actions = {
    default: async ({ locals, request }) => {
        const form = await superValidate(request, schema)
        console.log(form.data)
        if (!form.valid) return fail(400, { form })
        return { form }
        // try {
        //     await locals.pb
        //         .collection("users")
        //         .authWithPassword(form.data.username, form.data.password)
        // } catch ({ status, response }) {
        //     handleOfflineFailure(status)

        //     response.data.identity = {
        //         value: form.data.username,
        //         ...(response.data.identity || {}),
        //     }

        //     return fail(response.code, {
        //         form,
        //         message: response.message,
        //         data: response.data,
        //     })
        // }

        // throw redirect(303, `/tiers/${locals.previewTierId}`)
    },
}

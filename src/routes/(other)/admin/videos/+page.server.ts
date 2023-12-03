import { redirect, error, fail } from "@sveltejs/kit"
import {
    pbHandleClientResponseError,
    pbHandleFormActionError,
} from "$utilities/pb"
import type { VideosResponse, ClientResponseError } from "$utilities/pb-types"
import { superValidate } from "sveltekit-superforms/server"
import { deleteSchema, uploadSchema } from "./schema.js"

export async function load({ locals }) {
    if (!locals.user) throw redirect(303, "/login")
    if (!locals.user.isAdmin)
        throw error(401, "You are not authorized to see this page!")

    const form = await superValidate(deleteSchema)
    const uploadForm = await superValidate(uploadSchema)

    try {
        const videos: VideosResponse[] = await locals.pb
            .collection("videos")
            .getFullList()
        return { form, uploadForm, videos }
    } catch (e) {
        pbHandleClientResponseError(e as ClientResponseError)
        throw e
    }
}

export const actions = {
    upload: async ({ locals, request }) => {
        if (!locals.user) throw redirect(303, "/login")
        if (!locals.user.isAdmin)
            throw error(401, "You are not authorized to see this page!")

        const formData = await request.formData()

        const form = await superValidate(formData, uploadSchema)
        // form.data.videos = form.data.videos.filter(video => video !== undefined)
        if (!form.valid) return fail(400, { form })

        const videos = formData.getAll("videos")

        try {
            await Promise.all(
                videos.map(video =>
                    locals.pb
                        .collection("videos")
                        .create({ file: video }, { requestKey: null }),
                ),
            )
        } catch (e) {
            const e2 = pbHandleFormActionError(e, {})
            if (e2) return e2
            throw e
        }
    },
    delete: async ({ locals, request }) => {
        if (!locals.user) throw redirect(303, "/login")
        if (!locals.user.isAdmin)
            throw error(401, "You are not authorized to see this page!")

        const form = await superValidate(request, deleteSchema)
        if (!form.valid) return fail(400, { form })

        try {
            await Promise.all(
                form.data.videos.map(video => {
                    return locals.pb.collection("videos").delete(video)
                }),
            )
        } catch (e) {
            const e2 = pbHandleFormActionError(e, {})
            if (e2) return e2
            throw e
        }
    },
}

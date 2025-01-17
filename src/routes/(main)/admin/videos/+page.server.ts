import { error, fail, redirect } from "@sveltejs/kit"
import { superValidate, withFiles } from "sveltekit-superforms/server"
import {
    ClientResponseError,
    pbHandleClientResponseError,
    pbHandleFormActionError,
} from "$lib/utilities/pb"
import { schema } from "./schema.js"

export const load = async ({ locals }) => {
    if (!locals.loggedInUser) redirect(303, "/login")
    if (!locals.loggedInUser.isAdmin)
        error(401, "You are not authorized to see this page!")

    const [uploadForm, deleteForm] = await Promise.all([
        superValidate(schema.upload),
        superValidate(schema.delete),
    ])

    try {
        const videos = await locals.pb.collection("videos").getFullList()

        return { uploadForm, deleteForm, videos }
    } catch (e) {
        if (e instanceof ClientResponseError) {
            pbHandleClientResponseError(e)
        }
        throw e
    }
}

export const actions = {
    upload: async ({ locals, request }) => {
        if (!locals.loggedInUser) redirect(303, "/login")
        if (!locals.loggedInUser.isAdmin)
            error(401, "You are not authorized to perform this action!")

        const uploadForm = await superValidate(request, schema.upload)
        if (!uploadForm.valid) return fail(400, withFiles({ uploadForm }))

        try {
            await Promise.all(
                uploadForm.data.videos.map((file) =>
                    locals.pb
                        .collection("videos")
                        .create({ file }, { requestKey: file.name }),
                ),
            )
        } catch (e) {
            const e2 = pbHandleFormActionError(e, {})
            if (e2) return e2
            throw e
        }
    },
    delete: async ({ locals, request }) => {
        if (!locals.loggedInUser) redirect(303, "/login")
        if (!locals.loggedInUser.isAdmin)
            error(401, "You are not authorized to perform this action!")

        const deleteForm = await superValidate(request, schema.delete)

        if (!deleteForm.valid) {
            return fail(400, { deleteForm })
        }

        try {
            await Promise.all(
                deleteForm.data.videos.map((video) => {
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

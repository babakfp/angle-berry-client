import { error, fail, redirect } from "@sveltejs/kit"
import { superValidate } from "sveltekit-superforms/server"
import {
    pbHandleClientResponseError,
    pbHandleFormActionError,
} from "$utilities/pb/helpers"
import { ClientResponseError, type VideosResponse } from "$utilities/pb/types"
import { validateFiles } from "$utilities/validateFiles.js"
import { schemaDelete, videoFormats, videoMaxSizeLimitBytes } from "./schema.js"

export const load = async ({ locals }) => {
    if (!locals.user) redirect(303, "/login")
    if (!locals.user.isAdmin)
        error(401, "You are not authorized to see this page!")

    const deleteForm = await superValidate(schemaDelete)

    try {
        const videos: VideosResponse[] = await locals.pb
            .collection("videos")
            .getFullList()
        return {
            deleteForm,
            videos,
            uploadForm: { videos: undefined },
        }
    } catch (e) {
        if (e instanceof ClientResponseError) {
            pbHandleClientResponseError(e)
        }
        throw e
    }
}

export const actions = {
    upload: async ({ locals, request }) => {
        if (!locals.user) redirect(303, "/login")
        if (!locals.user.isAdmin)
            error(401, "You are not authorized to perform this action!")

        const formData = await request.formData()

        const isVideosValid = validateFiles(
            formData.getAll("videos"),
            videoMaxSizeLimitBytes,
            videoFormats,
        )

        if (!isVideosValid.isValid) {
            return fail(400, {
                message: isVideosValid.message,
            })
        }

        try {
            await Promise.all(
                isVideosValid.files.map(file =>
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
        if (!locals.user) redirect(303, "/login")
        if (!locals.user.isAdmin)
            error(401, "You are not authorized to perform this action!")

        const deleteForm = await superValidate(request, schemaDelete)
        if (!deleteForm.valid) return fail(400, { deleteForm })

        try {
            await Promise.all(
                deleteForm.data.videos.map(video => {
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

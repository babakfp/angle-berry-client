import { redirect, error, fail } from "@sveltejs/kit"
import {
    pbHandleClientResponseError,
    pbHandleFormActionError,
} from "$utilities/pb/helpers"
import { type VideosResponse, ClientResponseError } from "$utilities/pb/types"
import { superValidate } from "sveltekit-superforms/server"
import {
    deleteSchema,
    isFilesSchemaValid,
    isFileListValid,
    videoMaxSizeLimitBytes,
    videoFormats,
} from "./schema.js"
import { formatBytes } from "$utilities/formatBytes"
import type { FileServer } from "$utilities/FileServer"

export const load = async ({ locals }) => {
    if (!locals.user) redirect(303, "/login")
    if (!locals.user.isAdmin)
        error(401, "You are not authorized to see this page!")

    const deleteForm = await superValidate(deleteSchema)

    try {
        const videos: VideosResponse[] = await locals.pb
            .collection("videos")
            .getFullList()
        return {
            deleteForm,
            videos,
            uploadForm: { videos: undefined as any },
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
        const videos = formData.getAll("videos")

        if (
            !(
                videos &&
                Array.isArray(videos) &&
                isFilesSchemaValid(videos) &&
                isFileListValid(videos as FileServer[])
            )
        ) {
            return fail(400, { message: "Can't be empty!" })
        }

        const files = videos as FileServer[]

        const isAnyFileTooLarge = !files.every(
            file => (file as File).size <= videoMaxSizeLimitBytes,
        )

        if (isAnyFileTooLarge) {
            return fail(400, {
                message: `File size can't be above ${formatBytes(
                    videoMaxSizeLimitBytes,
                )}`,
            })
        }

        const containsInvalidExtensions = files.some(file => {
            const extension = file.name.split(".").pop()!
            return !videoFormats.includes(extension)
        })

        if (containsInvalidExtensions) {
            return fail(400, {
                message: `Only formats ${formatBytes(
                    videoMaxSizeLimitBytes,
                )} allowed!`,
            })
        }

        try {
            await Promise.all(
                files.map(file =>
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

        const deleteForm = await superValidate(request, deleteSchema)
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

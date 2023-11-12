import { redirect, error } from "@sveltejs/kit"
import {
    pbHandleClientResponseError,
    pbHandleFormActionError,
} from "$utilities/pb"
import type { VideosResponse, ClientResponseError } from "$utilities/pb-types"

export async function load({ locals }) {
    if (!locals.user) throw redirect(303, "/login")
    if (!locals.user.isAdmin)
        throw error(401, "You are not authorized to see this page!")

    try {
        const videos: VideosResponse[] = await locals.pb
            .collection("videos")
            .getFullList()
        return { videos }
    } catch (e) {
        pbHandleClientResponseError(e as ClientResponseError)
        throw e
    }
}

export const actions = {
    default: async ({ locals, request }) => {
        if (!locals.user) throw redirect(303, "/login")
        if (!locals.user.isAdmin)
            throw error(401, "You are not authorized to see this page!")

        const formData = await request.formData()

        const videos = formData.getAll("videos")

        // const form = await superValidate(request, tierDeletionSchema)
        // if (!form.valid) return fail(400, { form })

        try {
            console.log("videos", videos)

            await Promise.all(
                videos.map(video => {
                    console.log("video", video)

                    return locals.pb
                        .collection("videos")
                        .create({ file: video }, { requestKey: null })
                }),
            )
        } catch (e) {
            console.log("e", e)

            console.log(JSON.stringify(e, null, 4))

            const e2 = pbHandleFormActionError(e, {})
            if (e2) return e2
            throw e
        }
    },
}

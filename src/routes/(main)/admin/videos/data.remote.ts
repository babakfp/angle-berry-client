import { error, redirect } from "@sveltejs/kit"
import { form, getRequestEvent } from "$app/server"
import { pbInvalid } from "$lib/utilities/pb"
import { schema } from "./schema"

export const uploadVideos = form(schema.upload, async (data, issue) => {
    const { locals } = getRequestEvent()

    if (!locals.loggedInUser) redirect(303, "/login")
    if (!locals.loggedInUser.isAdmin)
        error(401, "You are not authorized to perform this action!")

    try {
        await Promise.all(
            data.videos.map((file) =>
                locals.pb
                    .collection("videos")
                    .create({ file }, { requestKey: file.name }),
            ),
        )
    } catch (e) {
        pbInvalid(e, issue)
    }
})

export const deleteVideos = form(schema.delete, async (data, issue) => {
    const { locals } = getRequestEvent()

    if (!locals.loggedInUser) redirect(303, "/login")
    if (!locals.loggedInUser.isAdmin)
        error(401, "You are not authorized to perform this action!")

    try {
        await Promise.all(
            data.videos.map((video) => {
                return locals.pb.collection("videos").delete(video)
            }),
        )
    } catch (e) {
        pbInvalid(e, issue)
    }
})

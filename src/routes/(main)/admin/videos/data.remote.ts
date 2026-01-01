import { redirect } from "@sveltejs/kit"
import { form, getRequestEvent, query } from "$app/server"
import { pbHandleError, pbInvalid } from "$lib/utilities/pb"
import { schema } from "./schema"

export const loadVideos = query(async () => {
    const { locals } = getRequestEvent()

    if (!locals.loggedInUser) {
        redirect(401, "/login")
    }
    if (!locals.loggedInUser.isAdmin) {
        redirect(401, "/")
    }

    try {
        return await locals.pb.collection("videos").getFullList()
    } catch (e) {
        throw pbHandleError(e)
    }
})

export const uploadVideos = form(schema.upload, async (data, issue) => {
    const { locals } = getRequestEvent()

    if (!locals.loggedInUser) {
        redirect(401, "/login")
    }
    if (!locals.loggedInUser.isAdmin) {
        redirect(401, "/")
    }

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

    if (!locals.loggedInUser) {
        redirect(401, "/login")
    }
    if (!locals.loggedInUser.isAdmin) {
        redirect(401, "/")
    }

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

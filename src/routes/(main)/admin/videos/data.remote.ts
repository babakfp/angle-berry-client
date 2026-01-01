import { invalid } from "@sveltejs/kit"
import { form, getRequestEvent } from "$app/server"
import { pbInvalid } from "$lib/utilities/pb"
import { schema } from "./schema"

export const uploadVideos = form(schema.upload, async (data, issue) => {
    const { locals } = getRequestEvent()

    if (!locals.loggedInUser) {
        invalid("You are not logged in!")
    }
    if (!locals.loggedInUser.isAdmin) {
        invalid("You are not an admin!")
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
        invalid("You are not logged in!")
    }
    if (!locals.loggedInUser.isAdmin) {
        invalid("You are not an admin!")
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

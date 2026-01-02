import { redirect } from "@sveltejs/kit"
import { getRequestEvent, query } from "$app/server"
import { type RealtimeMessagesResponse } from "$lib/utilities/pb"

export const loadMessages = query(async () => {
    const { locals } = getRequestEvent()

    if (!locals.loggedInUser) {
        redirect(303, "/login")
    }

    return await locals.pb
        .collection("messages")
        .getList<RealtimeMessagesResponse>(1, 50, {
            sort: "-created",
            expand: "user,repliedTo,repliedTo.user",
        })
})

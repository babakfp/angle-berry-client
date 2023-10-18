import { redirect, error } from "@sveltejs/kit"
import { handleCommunicationFailure } from "$utilities/pb/helpers.js"

export async function load({ locals, parent }) {
    const data = await parent()

    if (!locals.user) throw redirect(303, "/login")

    try {
        const messages = await locals.pb.collection("messages").getList(1, 50, {
            sort: "-created",
            expand: "user,repliedTo,repliedTo.user",
        })
        const events = await locals.pb.collection("events").getList(1, 50, {
            sort: "-created",
            expand: "user,user.retainedTiers,inviter,inviter.retainedTiers",
        })
        return {
            ...data,
            messages,
            events: events.items,
        }
    } catch ({ status, response }) {
        handleCommunicationFailure(status)
        throw error(status, response.message)
    }
}

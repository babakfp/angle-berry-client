import { redirect } from "@sveltejs/kit"
import { pbHandleClientResponseError } from "$utilities/pb"
import type { ClientResponseError } from "pocketbase"

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
    } catch (e) {
        pbHandleClientResponseError(e as ClientResponseError)
        throw e
    }
}

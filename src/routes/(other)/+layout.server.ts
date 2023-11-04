import { redirect } from "@sveltejs/kit"
import { pbHandleClientResponseError } from "$utilities/pb"
import type { ListResult, ClientResponseError } from "pocketbase"
import type { MessagesResponse, EventsResponse } from "$utilities/pb-types"

export async function load({ locals, parent }) {
    if (!locals.user) throw redirect(303, "/login")

    try {
        const messages: ListResult<MessagesResponse[]> = await locals.pb
            .collection("messages")
            .getList(1, 50, {
                sort: "-created",
                expand: "user,repliedTo,repliedTo.user",
            })
        const events: ListResult<EventsResponse[]> = await locals.pb
            .collection("events")
            .getList(1, 50, {
                sort: "-created",
                expand: "user,user.retainedTiers,inviter,inviter.retainedTiers",
            })
        return {
            ...(await parent()),
            user: locals.user, // Note: Yes, `locals.user` is not `null` after the `if` statment, however we are uisng `data` and `user` is `null` inside it!
            messages,
            events: events.items,
        }
    } catch (e) {
        pbHandleClientResponseError(e as ClientResponseError)
        throw e
    }
}

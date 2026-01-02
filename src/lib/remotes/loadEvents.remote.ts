import { redirect } from "@sveltejs/kit"
import { getRequestEvent, query } from "$app/server"
import { type RealtimeEventsResponse } from "$lib/utilities/pb"

export const loadEvents = query(async () => {
    const { locals } = getRequestEvent()

    if (!locals.loggedInUser) {
        redirect(303, "/login")
    }

    return await locals.pb
        .collection("events")
        .getList<RealtimeEventsResponse>(1, 50, {
            sort: "-created",
            expand: "user,user.retainedTiers,inviter,inviter.retainedTiers",
        })
})

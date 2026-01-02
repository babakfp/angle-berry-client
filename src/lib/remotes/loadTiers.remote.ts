import { redirect } from "@sveltejs/kit"
import { getRequestEvent, query } from "$app/server"
import {
    TIERS_RECORD_VISIBILITY_OPTIONS,
    type TiersResponse,
} from "$lib/utilities/pb"

export const loadTiers = query(async () => {
    const { locals } = getRequestEvent()

    if (!locals.loggedInUser) {
        redirect(303, "/login")
    }

    return await locals.pb.collection("tiers").getFullList<
        TiersResponse & {
            visibility: typeof TIERS_RECORD_VISIBILITY_OPTIONS.public
        }
    >({ filter: 'visibility = "public"' })
})

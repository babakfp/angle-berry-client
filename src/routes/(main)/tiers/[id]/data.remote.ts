import { redirect } from "@sveltejs/kit"
import * as v from "valibot"
import { getRequestEvent, query } from "$app/server"
import {
    pbHandleError,
    type TiersResponse,
    type VideosResponse,
} from "$lib/utilities/pb"

export const loadData = query(v.string(), async (tierId) => {
    const { locals } = getRequestEvent()

    if (!locals.loggedInUser) {
        redirect(401, "/login")
    }

    try {
        const tier: TiersResponse & {
            expand?: {
                videos: VideosResponse[]
            }
        } = await locals.pb
            .collection("tiers")
            .getOne(tierId, { expand: "videos" })

        const isTierAccessed =
            tierId === locals.previewTierId
            || locals.loggedInUser.retainedTiers.includes(tierId)
            || locals.loggedInUser.invitedUsers.length >= tier.invites

        if (!isTierAccessed) {
            tier.expand?.videos.map((video) => (video.file = ""))
        }

        return {
            isTierAccessed,
            tier,
        }
    } catch (e) {
        throw pbHandleError(e)
    }
})

import { error } from "@sveltejs/kit"
import type {
    EventsResponse,
    UsersResponse,
    TiersResponse,
    MessagesResponse,
} from "$utilities/pb-types"
import type { ListResult, ClientResponseError } from "pocketbase"

export const pbHandleClientResponseError = (e: ClientResponseError) => {
    if (e.status === 0) {
        throw error(500, "Database communication failure!")
    }
    if (e.response.code && e.response.message) {
        throw error(e.response.code, e.response.message)
    }
}

export function handleOfflineFailure(status: number) {
    if (status === 0) throw error(500, "Database communication failure!")
}

export function getPreviewTierId(tiers: TiersResponse[]) {
    return tiers.filter(tier => tier.invites === 0 && tier.price === 0)[0]?.id
}

export type CustomEventsResponse = EventsResponse & {
    expand: {
        user: UsersResponse & {
            expand: {
                retainedTiers: TiersResponse[]
            }
        }
        inviter: UsersResponse & {
            expand: {
                retainedTiers: TiersResponse[]
            }
        }
    }
}

export type CustomMessagesResponse = MessagesResponse & {
    expand: {
        user: UsersResponse
        repliedTo?: MessagesResponse & {
            expand: {
                user: UsersResponse
            }
        }
    }
}

export type ListResultEventsResponse = ListResult<CustomEventsResponse>
export type ListResultMessagesResponse = ListResult<CustomMessagesResponse>

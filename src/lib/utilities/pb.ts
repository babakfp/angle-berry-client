import { error, fail } from "@sveltejs/kit"
import type {
    EventsResponse,
    UsersResponse,
    TiersResponse,
    MessagesResponse,
} from "$utilities/pb-types"
import type { ListResult, ClientResponseError } from "pocketbase"

export const pbHandleFormActionError = (
    e: unknown | ClientResponseError,
    form: any,
) => {
    if ((e as ClientResponseError).status === 0) {
        return fail(500, {
            form,
            message: "Database communication failure!",
        })
    }
    if (
        (e as ClientResponseError).response.code &&
        (e as ClientResponseError).response.message
    ) {
        return fail((e as ClientResponseError).response.code, {
            form,
            message: (e as ClientResponseError).response.message,
            pb: (e as ClientResponseError).response.data,
        })
    }
}

export const pbHandleClientResponseError = (e: ClientResponseError) => {
    if (e.status === 0) {
        throw error(500, "Database communication failure!")
    }
    if (e.response.code && e.response.message) {
        throw error(e.response.code, e.response.message)
    }
}

export function getPreviewTierId(tiers: TiersResponse[]) {
    return tiers.filter(tier => tier.invites === 0 && tier.price === 0)[0]?.id
}

const PB_RESPONSE_CODES = {
    200: 200,
    204: 204,
    400: 400,
    401: 401,
    403: 403,
    404: 404,
} as const

export type ClientResponseErrorCustom = ClientResponseError & {
    status:
        | number
        | (typeof PB_RESPONSE_CODES)[400]
        | (typeof PB_RESPONSE_CODES)[401]
        | (typeof PB_RESPONSE_CODES)[403]
        | (typeof PB_RESPONSE_CODES)[404]
    response: {
        data:
            | {}
            | {
                  [key: string]: any
              }
    }
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

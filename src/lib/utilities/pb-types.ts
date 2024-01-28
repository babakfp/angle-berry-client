export * from "pocketbase"
export * from "$utilities/pb-typegen"

import type { ClientResponseError } from "pocketbase"
import type {
    EventsResponse,
    UsersResponse,
    TiersResponse,
    MessagesResponse,
} from "$utilities/pb-typegen"

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
            | Record<string, never>
            | {
                  [key: string]: any
              }
    }
}

export type RealtimeEventsResponse = EventsResponse & {
    expand: {
        user: UsersResponse & {
            expand: {
                retainedTiers: TiersResponse[]
            }
        }
        inviter?: UsersResponse & {
            expand: {
                retainedTiers: TiersResponse[]
            }
        }
    }
}

export type RealtimeMessagesResponse = MessagesResponse & {
    expand: {
        user: UsersResponse
        repliedTo?: MessagesResponse & {
            expand: {
                user: UsersResponse
            }
        }
    }
}

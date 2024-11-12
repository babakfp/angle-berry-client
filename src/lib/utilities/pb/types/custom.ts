import type {
    EventsResponse,
    MessagesResponse,
    TiersResponse,
    UsersResponse,
} from "$lib/utilities/pb/types/generated"

export * from "pocketbase"
export * from "$lib/utilities/pb/types/generated"
export type AuthModel = never
export type BaseModel = never
export type RecordModel = never

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

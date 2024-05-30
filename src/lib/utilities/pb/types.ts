import type {
    EventsResponse,
    MessagesResponse,
    TiersResponse,
    UsersResponse,
} from "@/utilities/pb/types-auto-generated"

export * from "pocketbase"
export * from "@/utilities/pb/types-auto-generated"

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

import type PocketBase, { ListResult } from "pocketbase"
import type {
    UsersResponse,
    RealtimeMessagesResponse,
    RealtimeEventsResponse,
    TiersResponse,
} from "$utilities/pb-types"

declare global {
    namespace App {
        interface Locals {
            pb: PocketBase
            user?: UsersResponse
            previewTierId?: string
            messages: ListResult<RealtimeMessagesResponse>
            events: ListResult<RealtimeEventsResponse>
            tiers: TiersResponse[]
        }
        interface PageData {
            // TODO: I don't know how to specify that the type can be `undefined` inside `(auth)` routes and ensure that it will be available inside `(other)` routes.
            user: UsersResponse // Is `undefined` inside `(auth)` routes.
            previewTierId?: string
            messages: ListResult<RealtimeMessagesResponse>
            events: ListResult<RealtimeEventsResponse>
            tiers: TiersResponse[]
        }
    }
}

export {}

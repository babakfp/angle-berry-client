import { writable } from "svelte/store"
import type {
    ListResult,
    RealtimeMessagesResponse,
} from "$lib/utilities/pb/types"

export const messages = writable<ListResult<RealtimeMessagesResponse>>()
export const unreadMessagesLength = writable(0)

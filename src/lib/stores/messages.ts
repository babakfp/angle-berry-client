import type {
    ListResult,
    RealtimeMessagesResponse,
} from "@/lib/utilities/pb/types"
import { writable } from "svelte/store"

export const messages = writable<ListResult<RealtimeMessagesResponse>>()
export const unreadMessagesLength = writable(0)

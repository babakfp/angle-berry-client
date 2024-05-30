import { writable } from "svelte/store"
import type { ListResult, RealtimeMessagesResponse } from "@/utilities/pb/types"

export const messages = writable<ListResult<RealtimeMessagesResponse>>()
export const unreadMessagesLength = writable(0)

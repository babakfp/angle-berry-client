import { writable } from "svelte/store"
import type { ListResult, RealtimeMessagesResponse } from "$lib/utilities/pb"

export const messages = writable<ListResult<RealtimeMessagesResponse>>()

export const unreadMessagesLength = $state({ _: 0 })

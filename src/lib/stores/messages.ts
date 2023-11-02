import { writable } from "svelte/store"
import type { MessagesResponse } from "$utilities/pb-types"

export const messages = writable<MessagesResponse[]>([])
export const unreadMessagesLength = writable(0)

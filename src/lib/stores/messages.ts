import { writable } from "svelte/store"
import type { ListResultMessagesResponse } from "$utilities/pb"

export const messages = writable<ListResultMessagesResponse>()
export const unreadMessagesLength = writable(0)

import { writable } from "svelte/store"

export const messages = writable([])
export const unreadMessagesLength = writable(0)

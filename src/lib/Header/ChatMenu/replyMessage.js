import { writable } from "svelte/store"

export const isReplying = writable(false)
export const replyTargetMessage = writable({})

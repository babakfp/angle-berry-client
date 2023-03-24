import { writable } from "svelte/store"

export const isReplying = writable(false)
export const messageThatWeAreReplyingTo = writable(null)

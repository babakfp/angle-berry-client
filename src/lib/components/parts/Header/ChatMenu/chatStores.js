import { writable } from "svelte/store"

export const isContextMenuOpen = writable(false)
export const contextMenuTargetEvent = writable(null)
export const contextMenuTargetMessage = writable(null)

export const messageIdToDelete = writable(null)

export const messageIdToEdit = writable(null)

export const isReplying = writable(false)
export const replyTargetMessage = writable({})

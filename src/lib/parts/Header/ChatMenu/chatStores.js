import { writable } from "svelte/store"

export const isContextMenuOpen = writable(false)
export const isContextMenuOpen2 = writable(false)
export const contextMenuTargetEvent = writable(null)
export const contextMenuTargetMessage = writable(null)
export const messageIdsToDelete = writable([])
export const messageIdToEdit = writable(null)
export const isReplying = writable(false)
export const replyTargetMessage = writable({})
export const messageInputElement = writable(undefined)
export const selectedMessageIds = writable([])

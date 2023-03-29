import { writable } from "svelte/store"

export const isContextMenuOpen = writable(false)
export const contextMenuTargetEvent = writable(null)
export const contextMenuTargetMessage = writable(null)

import { writable } from "svelte/store"
import type { RealtimeMessagesResponse } from "$utilities/pb-types"

export const isContextMenuOpen = writable(false)
export const isTouchDeviceContextMenuOpen = writable(false)
export const contextMenuTargetEvent = writable<
    MouseEvent | PointerEvent | null
>(null)
export const contextMenuTargetMessage = writable<
    RealtimeMessagesResponse | undefined
>(undefined)
export const messageIdsToDelete = writable<string[]>([])
export const messageIdToEdit = writable<string>("")
export const isReplying = writable(false)
export const replyTargetMessage = writable<
    RealtimeMessagesResponse | undefined
>(undefined)
export const messageInputElement = writable<HTMLTextAreaElement | undefined>(
    undefined,
)
export const selectedMessageIds = writable<string[]>([])

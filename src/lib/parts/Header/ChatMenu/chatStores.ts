import { writable } from "svelte/store"
import type { RealtimeMessagesResponse } from "$utilities/pb/types"

export const isContextMenuOpen = writable(false)
export const isTouchDeviceContextMenuOpen = writable(false)
export const contextMenuTargetEvent = writable<
    MouseEvent | PointerEvent | undefined
>()
export const contextMenuTargetMessage = writable<
    RealtimeMessagesResponse | undefined
>()
export const messageIdsToDelete = writable<string[]>([])
export const messageIdToEdit = writable<string | undefined>()
export const isReplying = writable(false)
export const replyTargetMessage = writable<
    RealtimeMessagesResponse | undefined
>()
export const messageInputElement = writable<HTMLTextAreaElement | undefined>()
export const selectedMessageIds = writable<string[]>([])

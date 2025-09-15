import { writable } from "svelte/store"
import type { RealtimeMessagesResponse } from "$lib/utilities/pb"

export const isContextMenuOpen = $state({ state: false })
export const isTouchDeviceContextMenuOpen = $state({ state: false })
export const contextMenuTargetEvent = $state<{
    state: MouseEvent | PointerEvent | undefined
}>({ state: undefined })
export const contextMenuTargetMessage = $state<{
    state: RealtimeMessagesResponse | undefined
}>({ state: undefined })
export const messageIdsToDelete = writable<string[]>([])
export const messageIdToEdit = writable<string | undefined>()
export const isReplying = writable(false)
export const replyTargetMessage = writable<
    RealtimeMessagesResponse | undefined
>()
export const messageInputElement = writable<HTMLTextAreaElement | undefined>()
export const selectedMessageIds = writable<string[]>([])

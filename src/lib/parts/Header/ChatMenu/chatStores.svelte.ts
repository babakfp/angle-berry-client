import type { RealtimeMessagesResponse } from "$lib/utilities/pb"

export const isContextMenuOpen = $state({
    state: false,
})

export const isTouchDeviceContextMenuOpen = $state({
    state: false,
})

export const contextMenuTargetEvent = $state<{
    state: MouseEvent | PointerEvent | undefined
}>({
    state: undefined,
})

export const contextMenuTargetMessage = $state<{
    state: RealtimeMessagesResponse | undefined
}>({
    state: undefined,
})

export const messageIdsToDelete = $state<{
    state: string[]
}>({
    state: [],
})

export const messageIdToEdit = $state<{
    state: string | undefined
}>({
    state: undefined,
})

export const isReplying = $state({
    state: false,
})

export const replyTargetMessage = $state<{
    state: RealtimeMessagesResponse | undefined
}>({
    state: undefined,
})

export const messageInputElement = $state<{
    state: HTMLTextAreaElement | undefined
}>({
    state: undefined,
})

export const selectedMessageIds = $state<{
    state: string[]
}>({
    state: [],
})

import type { RealtimeMessagesResponse } from "$lib/utilities/pb"

export const isContextMenuOpen = $state({
    _: false,
})

export const isTouchDeviceContextMenuOpen = $state({
    _: false,
})

export const contextMenuTargetEvent = $state<{
    _: MouseEvent | PointerEvent | undefined
}>({
    _: undefined,
})

export const contextMenuTargetMessage = $state<{
    _: RealtimeMessagesResponse | undefined
}>({
    _: undefined,
})

export const messageIdsToDelete = $state<{
    _: string[]
}>({
    _: [],
})

export const messageIdToEdit = $state<{
    _: string | undefined
}>({
    _: undefined,
})

export const isReplying = $state({
    _: false,
})

export const replyTargetMessage = $state<{
    _: RealtimeMessagesResponse | undefined
}>({
    _: undefined,
})

export const messageInputElement = $state<{
    _: HTMLTextAreaElement | undefined
}>({
    _: undefined,
})

export const selectedMessageIds = $state<{
    _: string[]
}>({
    _: [],
})

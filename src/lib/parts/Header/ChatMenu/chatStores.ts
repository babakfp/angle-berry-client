import { writable } from "svelte/store"
import type { MessagesResponse, UsersResponse } from "$utilities/pb-types"

export const isContextMenuOpen = writable(false)
export const isContextMenuOpen2 = writable(false)
export const contextMenuTargetEvent = writable<
    MouseEvent | PointerEvent | null
>(null)
export const contextMenuTargetMessage = writable<MessagesResponse<{
    user: UsersResponse
}> | null>(null)
export const messageIdsToDelete = writable<string[]>([])
export const messageIdToEdit = writable<string | null | undefined>(null)
export const isReplying = writable(false)
export const replyTargetMessage = writable<MessagesResponse<{
    user: UsersResponse
}> | null>(null)
export const messageInputElement = writable<HTMLTextAreaElement | null>(null)
export const selectedMessageIds = writable<string[]>([])

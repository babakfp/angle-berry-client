import { writable } from "svelte/store"
import type { MessagesResponse, UsersResponse } from "$utilities/pb-types"
import type { CustomMessagesResponse } from "$utilities/pb"

export const isContextMenuOpen = writable(false)
export const isContextMenuOpen2 = writable(false)
export const contextMenuTargetEvent = writable<
    MouseEvent | PointerEvent | null
>(null)
export const contextMenuTargetMessage = writable<
    CustomMessagesResponse | undefined
>(undefined)
export const messageIdsToDelete = writable<string[]>([])
export const messageIdToEdit = writable<string>("")
export const isReplying = writable(false)
export const replyTargetMessage = writable<CustomMessagesResponse | undefined>(
    undefined,
)
export const messageInputElement = writable<HTMLTextAreaElement | undefined>(
    undefined,
)
export const selectedMessageIds = writable<string[]>([])

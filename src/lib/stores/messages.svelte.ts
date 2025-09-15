import type { ListResult, RealtimeMessagesResponse } from "$lib/utilities/pb"

export const messages = $state<{
    _: ListResult<RealtimeMessagesResponse> | undefined
}>({
    _: undefined,
})

export const unreadMessagesLength = $state({ _: 0 })

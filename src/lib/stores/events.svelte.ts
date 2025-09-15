import type { ListResult, RealtimeEventsResponse } from "$lib/utilities/pb"

export const events = $state<{
    _: ListResult<RealtimeEventsResponse> | undefined
}>({
    _: undefined,
})

export const unseenEventsLength = $state({ _: 0 })

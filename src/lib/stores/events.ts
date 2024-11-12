import { writable } from "svelte/store"
import type { ListResult, RealtimeEventsResponse } from "$lib/utilities/pb"

export const events = writable<ListResult<RealtimeEventsResponse>>()
export const unseenEventsLength = writable(0)

import { writable } from "svelte/store"
import type { ListResult, RealtimeEventsResponse } from "@/utilities/pb/types"

export const events = writable<ListResult<RealtimeEventsResponse>>()
export const unseenEventsLength = writable(0)

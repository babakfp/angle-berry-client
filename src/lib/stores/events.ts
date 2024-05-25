import type {
    ListResult,
    RealtimeEventsResponse,
} from "@/lib/utilities/pb/types"
import { writable } from "svelte/store"

export const events = writable<ListResult<RealtimeEventsResponse>>()
export const unseenEventsLength = writable(0)

import { writable } from "svelte/store"
import type { ListResultEventsResponse } from "$utilities/pb-types"

export const events = writable<ListResultEventsResponse>()
export const unseenEventsLength = writable(0)

import { writable } from "svelte/store"
import type { TiersResponse } from "$utilities/pb-types"

export const events = writable<TiersResponse[]>([])
export const unseenEventsLength = writable(0)

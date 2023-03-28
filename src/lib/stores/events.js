import { writable } from "svelte/store"

export const events = writable([])
export const unseenEventsLength = writable(0)

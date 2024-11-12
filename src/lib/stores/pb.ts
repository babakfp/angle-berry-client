import PocketBase from "pocketbase"
import { get, writable } from "svelte/store"
import { browser } from "$app/environment"
import { PUBLIC_PB_URL } from "$env/static/public"
import type { PocketBaseType } from "$lib/utilities/pb"

export const pb = writable<PocketBaseType>(new PocketBase(PUBLIC_PB_URL))

if (browser) {
    get(pb).authStore.loadFromCookie(document.cookie || "")
    get(pb).authStore.onChange(() => {
        document.cookie = get(pb).authStore.exportToCookie({ httpOnly: false })
    })
}

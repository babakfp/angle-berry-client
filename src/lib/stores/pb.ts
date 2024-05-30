import PocketBase from "pocketbase"
import { get, writable } from "svelte/store"
import { browser } from "$app/environment"
import { PUBLIC_POCKETBASE_URL } from "$env/static/public"
import type { TypedPocketBase } from "@/lib/utilities/pb/types-auto-generated"

export const pb = writable<TypedPocketBase>(
    new PocketBase(PUBLIC_POCKETBASE_URL),
)

if (browser) {
    get(pb).authStore.loadFromCookie(document.cookie || "")
    get(pb).authStore.onChange(() => {
        document.cookie = get(pb).authStore.exportToCookie({ httpOnly: false })
    })
}

import PocketBase from "pocketbase"
import { writable, get } from "svelte/store"
import { browser } from "$app/environment"
import { PUBLIC_POCKETBASE_URL } from "$env/static/public"

export const pb = writable(new PocketBase(PUBLIC_POCKETBASE_URL))

if (browser) {
	get(pb).authStore.loadFromCookie(document.cookie || "")
	get(pb).authStore.onChange(() => {
		document.cookie = get(pb).authStore.exportToCookie({ httpOnly: false })
	})
	console.log(get(pb).authStore.isValid)
}

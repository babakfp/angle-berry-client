import PocketBase from "pocketbase"
import { browser } from "$app/environment"
import { PUBLIC_PB_URL } from "$env/static/public"
import type { PocketBaseType } from "$lib/utilities/pb"

export const pb = $state<{ _: PocketBaseType }>({
    _: new PocketBase(PUBLIC_PB_URL),
})

if (browser) {
    pb._.authStore.loadFromCookie(document.cookie || "")
    pb._.authStore.onChange(() => {
        document.cookie = pb._.authStore.exportToCookie({ httpOnly: false })
    })
}

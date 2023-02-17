import { redirect } from "@sveltejs/kit"
import PocketBase from "pocketbase"
import { POCKETBASE_URL } from "$env/static/private"

export async function handle({ event, resolve }) {
	event.locals.pb = new PocketBase(POCKETBASE_URL)
	event.locals.pb.authStore.loadFromCookie(
		event.request.headers.get("cookie") || null
	)

	if (event.locals.pb.authStore.isValid) {
		event.locals.user = structuredClone(event.locals.pb.authStore.model)
	} else {
		event.locals.user = null
	}

	const response = await resolve(event)
	response.headers.set(
		"set-cookie",
		event.locals.pb.authStore.exportToCookie({ secure: false })
	)
	return response
}

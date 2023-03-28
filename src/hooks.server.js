import PocketBase from "pocketbase"
import { POCKETBASE_URL } from "$env/static/private"

export async function handle({ event, resolve }) {
	event.locals.pb = new PocketBase(POCKETBASE_URL)
	event.locals.pb.authStore.loadFromCookie(
		event.request.headers.get("cookie") || ""
	)

	event.locals.user = event.locals.pb.authStore.isValid
		? structuredClone(event.locals.pb.authStore.model)
		: null

	const response = await resolve(event)

	response.headers.set(
		"set-cookie",
		event.locals.pb.authStore.exportToCookie({
			secure: false,
			httpOnly: false,
		})
	)

	return response
}

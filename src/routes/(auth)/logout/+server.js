import { redirect } from "@sveltejs/kit"

export function POST({ locals }) {
	locals.pb.authStore.clear()
	locals.user = null
	throw redirect(303, "/login")
}

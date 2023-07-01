import { redirect } from "@sveltejs/kit"

export function GET({ locals }) {
    if (locals.user) throw redirect(303, "/")
}

export function POST({ locals }) {
    locals.pb.authStore.clear()
    locals.user = null
    throw redirect(303, "/login")
}

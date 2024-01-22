import { redirect } from "@sveltejs/kit"

export function GET({ locals }) {
    if (locals.user) {
        locals.pb.authStore.clear()
        locals.user = undefined
    }
    redirect(303, "/login")
}

import { redirect } from "@sveltejs/kit"

export function GET() {
    redirect(303, "/")
}

export function POST({ locals }) {
    if (!locals.user) redirect(303, "/")

    locals.pb.authStore.clear()
    locals.user = undefined
    redirect(303, "/login")
}

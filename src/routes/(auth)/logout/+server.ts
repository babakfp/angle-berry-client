import { redirect } from "@sveltejs/kit"

export const GET = ({ locals }) => {
    if (locals.user) {
        redirect(303, "/")
    }
    redirect(303, "/login")
}

export const POST = ({ locals }) => {
    if (locals.user) {
        locals.pb.authStore.clear()
        locals.user = undefined
    }
    redirect(303, "/login")
}

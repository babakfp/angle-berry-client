import { redirect } from "@sveltejs/kit"

export const GET = ({ locals }) => {
    if (locals.loggedInUser) {
        redirect(303, "/")
    }
    redirect(303, "/login")
}

export const POST = ({ locals }) => {
    if (locals.loggedInUser) {
        locals.pb.authStore.clear()
        locals.loggedInUser = undefined
    }
    redirect(303, "/login")
}

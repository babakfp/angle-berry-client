import { redirect } from "@sveltejs/kit"

export const load = ({ locals }) => {
    if (!locals.loggedInUser) redirect(303, "/login")
    redirect(303, "/")
}

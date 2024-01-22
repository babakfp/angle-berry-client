import { redirect, error } from "@sveltejs/kit"

export const load = async ({ locals, parent }) => {
    if (!locals.user) redirect(303, "/login")
    if (!locals.user.isAdmin)
        error(401, "You are not authorized to see this page!")
    await parent()
}

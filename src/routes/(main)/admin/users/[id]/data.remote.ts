import { error, invalid, redirect } from "@sveltejs/kit"
import { resolve } from "$app/paths"
import { form, getRequestEvent } from "$app/server"
import { isUserACreatedBeforeUserB } from "$lib/utilities/isUserACreatedBeforeUserB"
import { pbInvalid } from "$lib/utilities/pb"
import { schema } from "./schema"

export const updateUser = form(schema, async (data, issue) => {
    const { locals, params } = getRequestEvent()

    if (!locals.loggedInUser) {
        redirect(401, resolve("/login"))
    }
    if (!locals.loggedInUser.isAdmin) {
        error(401, "You are not authorized to perform this action!")
    }

    // TODO: get userid from schema insetad of params?
    const userId = params.id

    if (!userId) {
        invalid("User ID is required!")
    }

    const targetUser = await locals.pb.collection("users").getOne(userId)

    if (
        locals.loggedInUser.id !== targetUser.id
        && targetUser.isAdmin
        && !isUserACreatedBeforeUserB(locals.loggedInUser, targetUser)
    ) {
        invalid("You cannot modify the data of a super admin account.")
    }

    // Is admin role changed?
    if (data.isAdmin !== targetUser.isAdmin) {
        // Is the logged-in user is the same as the user being edited?
        if (locals.loggedInUser.id === targetUser.id) {
            invalid(issue.isAdmin("You cannot modify your own admin role."))
        }
    }

    try {
        await locals.pb.collection("users").update(userId, data)
    } catch (e) {
        pbInvalid(e, issue)
    }

    return {
        redirect: resolve("/admin/users"),
    } as const
})

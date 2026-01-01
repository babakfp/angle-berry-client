import { invalid, redirect } from "@sveltejs/kit"
import * as v from "valibot"
import { form, getRequestEvent, query } from "$app/server"
import { isUserACreatedBeforeUserB } from "$lib/utilities/isUserACreatedBeforeUserB"
import { pbHandleError, pbInvalid } from "$lib/utilities/pb"
import { schema } from "./schema"

export const loadUserToEdit = query(v.string(), async (id) => {
    const { locals } = getRequestEvent()

    if (!locals.loggedInUser) {
        redirect(303, "/login")
    }
    if (!locals.loggedInUser.isAdmin) {
        redirect(303, "/")
    }

    try {
        return await locals.pb.collection("users").getOne(id)
    } catch (e) {
        throw pbHandleError(e)
    }
})

export const updateUser = form(schema, async (data, issue) => {
    const { locals } = getRequestEvent()

    if (!locals.loggedInUser) {
        invalid("You are not logged in!")
    }
    if (!locals.loggedInUser.isAdmin) {
        invalid("You are not an admin!")
    }

    const targetUser = await locals.pb.collection("users").getOne(data.id)

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
        await locals.pb.collection("users").update(data.id, data)
    } catch (e) {
        pbInvalid(e, issue)
    }

    return {
        redirect: "/admin/users",
    } as const
})

import { invalid } from "@sveltejs/kit"
import { form, getRequestEvent } from "$app/server"
import { pbInvalid, type UsersResponse } from "$lib/utilities/pb"
import { schema } from "../(lib)/schema"

export const register = form(schema, async (data, issue) => {
    const { locals, url } = getRequestEvent()

    if (locals.loggedInUser) {
        invalid("You are already logged in!")
    }

    let inviter: UsersResponse | undefined = undefined
    const inviterId = url.searchParams.get("id")

    if (inviterId) {
        try {
            inviter = await locals.pb.collection("users").getOne(inviterId)
        } catch (e) {
            pbInvalid(e, issue, (e) => {
                if (e.response.status === 404) return "skip"
            })
        }
    }

    try {
        const newUser = await locals.pb.collection("users").create({
            username: data.username,
            password: data.password,
            passwordConfirm: data.password,
            retainedTiers: locals.previewTierId ? [locals.previewTierId] : [],
            invitedBy: inviter?.id,
        })

        // Adding the new user to the list of invited users by the inviter user.
        if (inviter && newUser) {
            await locals.pb.collection("users").update(inviter.id, {
                invitedUsers: [newUser.id, ...inviter.invitedUsers],
            })
        }

        await locals.pb.collection("events").create({
            user: newUser.id,
            inviter: inviter?.id,
            inviterInvites: inviter ? inviter.invitedUsers.length + 1 : 0,
        })

        // Logging the user in
        await locals.pb
            .collection("users")
            .authWithPassword(data.username, data.password)
    } catch (e) {
        pbInvalid(e, issue)
    }

    try {
        await locals.pb
            .collection("users")
            .authWithPassword(data.username, data.password)
    } catch (e) {
        pbInvalid(e, issue)
    }

    if (locals.previewTierId) {
        return {
            redirect: `/tiers/${locals.previewTierId}`,
        } as const
    }

    return {
        redirect: "/",
    } as const
})

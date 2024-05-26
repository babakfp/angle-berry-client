import {
    pbHandleClientResponseError,
    pbHandleFormActionError,
} from "@/lib/utilities/pb/helpers"
import {
    ClientResponseError,
    type UsersResponse,
} from "@/lib/utilities/pb/types"
import { fail, redirect } from "@sveltejs/kit"
import { superValidate } from "sveltekit-superforms/server"
import { schema } from "../(lib)/schema"

export const load = async ({ locals }) => {
    if (locals.loggedInUser) {
        redirect(303, "/")
    }

    return {
        form: await superValidate(schema),
    }
}

export const actions = {
    default: async ({ locals, request, url }) => {
        if (locals.loggedInUser) {
            redirect(303, "/")
        }

        const form = await superValidate(request, schema)

        if (!form.valid) {
            return fail(400, { form })
        }

        let inviter: UsersResponse | undefined = undefined
        const inviterId = url.searchParams.get("id")

        try {
            if (inviterId)
                inviter = await locals.pb.collection("users").getOne(inviterId)
        } catch (e) {
            if (e instanceof ClientResponseError) {
                if (e.status !== 404) {
                    pbHandleClientResponseError(e)
                }
            } else {
                throw e
            }
        }

        try {
            const newUser: UsersResponse = await locals.pb
                .collection("users")
                .create({
                    username: form.data.username,
                    password: form.data.password,
                    passwordConfirm: form.data.password,
                    retainedTiers: [
                        ...[locals.previewTierId ? locals.previewTierId : []],
                    ],
                    invitedBy: inviter?.id,
                })

            // Adding the new user to the list of invited users by the inviter user.
            if (inviter && newUser)
                await locals.pb.collection("users").update(inviter.id, {
                    invitedUsers: [newUser.id, ...inviter.invitedUsers],
                })

            await locals.pb.collection("events").create({
                user: newUser.id,
                inviter: inviter?.id,
                inviterInvites: inviter ? inviter.invitedUsers.length + 1 : 0,
            })

            // Logging the user in
            await locals.pb
                .collection("users")
                .authWithPassword(form.data.username, form.data.password)
        } catch (e) {
            const e2 = pbHandleFormActionError(e, form)
            if (e2) return e2
            throw e
        }

        if (locals.previewTierId) {
            redirect(303, `/tiers/${locals.previewTierId}`)
        }

        redirect(303, "")
    },
}

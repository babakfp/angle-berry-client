import { redirect, fail } from "@sveltejs/kit"
import { superValidate } from "sveltekit-superforms/server"
import {
    pbHandleClientResponseError,
    pbHandleFormActionError,
} from "$utilities/pb"
import { schema } from "../schema"
import { type UsersResponse, ClientResponseError } from "$utilities/pb-types"

export const load = async ({ locals }) => {
    if (locals.user) redirect(303, "/")
    const form = await superValidate(schema)
    return { form }
}

export const actions = {
    default: async ({ locals, request, url }) => {
        if (locals.user) redirect(303, "/")

        const form = await superValidate(request, schema)
        if (!form.valid) return fail(400, { form })

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
                    invitedBy: inviter ? [inviterId] : undefined,
                })

            // Adding the new user to the list of invited users by the inviter user.
            if (inviter && newUser)
                await locals.pb.collection("users").update(inviter.id, {
                    invitedUsers: [newUser.id, ...inviter.invitedUsers],
                })

            await locals.pb.collection("events").create({
                user: newUser.id,
                inviter: inviter ? inviterId : undefined,
                inviterInvites: inviter ? inviter.invitedUsers.length + 1 : 0,
            })

            // Logging user in
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

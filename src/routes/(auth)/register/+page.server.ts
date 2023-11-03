import { redirect, fail } from "@sveltejs/kit"
import { superValidate } from "sveltekit-superforms/server"
import {
    pbHandleClientResponseError,
    handleOfflineFailure,
} from "$utilities/pb"
import { schema } from "../schema"
import type PocketBase from "pocketbase"
import type { UsersResponse } from "$utilities/pb-types"
import type { ClientResponseError } from "pocketbase"

export const load = async () => {
    const form = await superValidate(schema)
    return { form }
}

export const actions = {
    default: async ({ locals, request, url }) => {
        const form = await superValidate(request, schema)
        if (!form.valid) return fail(400, { form })

        let inviter: UsersResponse | null = null
        const inviterId = url.searchParams.get("id")

        try {
            if (inviterId)
                inviter = await locals.pb.collection("users").getOne(inviterId)
        } catch (e) {
            if ((e as ClientResponseError).status !== 404) {
                pbHandleClientResponseError(e as ClientResponseError)
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
                    invitedBy: inviter ? [inviterId] : null,
                })

            // Adding the new user to the list of invited users by the inviter user.
            if (inviter && newUser)
                await addInvitedUserToInviterList(locals.pb, inviter, newUser)

            await locals.pb.collection("events").create({
                user: newUser.id,
                inviter: inviter ? inviterId : null,
                inviterInvites: inviter ? inviter.invitedUsers.length + 1 : 0,
            })

            // Logging user in
            await locals.pb
                .collection("users")
                .authWithPassword(form.data.username, form.data.password)
        } catch ({ response }) {
            // TODO
            handleOfflineFailure(response.code)

            return fail(response.code, {
                form,
                message: response.message,
                data: response.data,
            })
        }

        if (locals.previewTierId) {
            throw redirect(303, `/tiers/${locals.previewTierId}`)
        } else {
            throw redirect(303, "")
        }
    },
}

async function addInvitedUserToInviterList(
    pb: PocketBase,
    Inviter: UsersResponse,
    newUser: UsersResponse,
) {
    await pb.collection("users").update(Inviter.id, {
        invitedUsers: [newUser.id, ...Inviter.invitedUsers],
    })
}

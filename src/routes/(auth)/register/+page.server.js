import { redirect, fail } from "@sveltejs/kit"
import { superValidate } from "sveltekit-superforms/server"
import { handleCommunicationFailure } from "$utils/pb/helpers.js"
import { schema } from "$lib/utils/schema.js"

export const load = async () => {
    const form = await superValidate(schema)
    return { form }
}

export const actions = {
    default: async ({ locals, request, url }) => {
        const form = await superValidate(request, schema)
        if (!form.valid) return fail(400, { form })

        let inviter = null
        const inviterId = url.searchParams.get("id")

        try {
            if (inviterId)
                inviter = await locals.pb.collection("users").getOne(inviterId)
        } catch {}

        try {
            const newUser = await locals.pb.collection("users").create({
                username: form.data.username,
                password: form.data.password,
                passwordConfirm: form.data.password,
                retainedTiers: [locals.previewTierId],
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
            handleCommunicationFailure(response.code)

            return fail(response.code, {
                form,
                message: response.message,
                data: response.data,
            })
        }

        throw redirect(303, `/tiers/${locals.previewTierId}`)
    },
}

async function addInvitedUserToInviterList(pb, InviterRecord, newUserRecord) {
    await pb.collection("users").update(InviterRecord.id, {
        invitedUsers: [newUserRecord.id, ...InviterRecord.invitedUsers],
    })
}

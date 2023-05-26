import { redirect, fail } from "@sveltejs/kit"
import {
    isUsernameInvalid,
    isPasswordInvalid,
} from "$lib/Form/formValidation.js"
import { handlePbConnectionIssue } from "$utils/handlePbConnectionIssue.js"
import { getPreviewTierId } from "$utils/previewTier.js"

export const actions = {
    default: async ({ locals, request, url }) => {
        const { username, password } = Object.fromEntries(
            await request.formData()
        )

        const _isUsernameInvalid = isUsernameInvalid(username, {
            username: { value: username },
        })
        if (_isUsernameInvalid) return _isUsernameInvalid

        const _isPasswordInvalid = isPasswordInvalid(password, {
            username: { value: username },
        })
        if (_isPasswordInvalid) return _isPasswordInvalid

        const inviterId = url.searchParams.get("id")
        let doesInviterExists

        try {
            if (inviterId)
                doesInviterExists = await locals.pb
                    .collection("users")
                    .getOne(inviterId)

            // Registering
            const newlyCreatedUser = await locals.pb
                .collection("users")
                .create({
                    username,
                    password,
                    passwordConfirm: password,
                    retainedTiers: [getPreviewTierId()],
                    invitedBy: doesInviterExists ? [inviterId] : null,
                })

            // Adding the new user to the list of invited users by the inviter user.
            if (doesInviterExists && newlyCreatedUser) {
                await locals.pb.collection("users").update(inviterId, {
                    invitedUsers: [
                        structuredClone(newlyCreatedUser).id,
                        ...structuredClone(doesInviterExists).invitedUsers,
                    ],
                })
            }

            await locals.pb.collection("events").create({
                user: structuredClone(newlyCreatedUser).id,
                inviter: doesInviterExists ? inviterId : null,
                inviterInvites: doesInviterExists
                    ? structuredClone(doesInviterExists).invitedUsers.length + 1
                    : 0,
            })

            // Logging user in
            await locals.pb
                .collection("users")
                .authWithPassword(username, password)
        } catch ({ status, response }) {
            handlePbConnectionIssue(status)

            if (response.message === "Failed to create record.")
                response.message =
                    "We were unable to create your account. Did you fill in all the fields correctly?"

            response.data.username = {
                value: username,
                ...(response.data.username || {}),
            }

            return fail(response.code, {
                message: response.message,
                ...response.data,
            })
        }

        throw redirect(303, `/tiers/${getPreviewTierId()}`)
    },
}

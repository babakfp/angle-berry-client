import { redirect, fail } from "@sveltejs/kit"
import {
	isUsernameInvalid,
	isPasswordInvalid,
} from "$lib/Form/formValidation.js"
import { handlePbConnectionIssue } from "$utils/handlePbConnectionIssue.js"
import { getPreviewTierId } from "$utils/previewTier.js"

export const actions = {
	default: async ({ locals, request }) => {
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

		try {
			await locals.pb
				.collection("users")
				.authWithPassword(username, password)
		} catch ({ status, response }) {
			handlePbConnectionIssue(status)

			response.data.identity = {
				value: username,
				...(response.data.identity || {}),
			}

			return fail(response.code, {
				message: response.message,
				...response.data,
			})
		}

		throw redirect(303, `/tiers/${getPreviewTierId()}`)
	},
}

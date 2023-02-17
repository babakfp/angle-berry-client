import { fail } from "@sveltejs/kit"
import { handlePbConnectionIssue } from "$lib/handlePbConnectionIssue.js"

export const actions = {
	default: async ({ locals, request }) => {
		const { messageContent } = Object.fromEntries(await request.formData())
		try {
			await locals.pb.collection("messages").create({
				content: messageContent,
				user: locals.user.id,
			})
		} catch ({ status, data }) {
			handlePbConnectionIssue(status)

			data.data.content = {
				value: messageContent,
				...(data.data.content || {}),
			}

			return fail(data.code, { message: data.message, ...data.data })
		}
	},
}

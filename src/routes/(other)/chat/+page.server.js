import { fail } from "@sveltejs/kit"
import { handlePbConnectionIssue } from "$lib/handlePbConnectionIssue.js"

export const actions = {
	default: async ({ locals, request }) => {
		let formData = Object.fromEntries(await request.formData())
		let { messageContent } = formData
		if (!messageContent) return
		if (messageContent) {
			messageContent = messageContent.trim()
			messageContent = messageContent.replace(/(?:\r\n|\r|\n)/g, "<br>")
		}

		try {
			await locals.pb.collection("messages").create({
				content: messageContent,
				user: locals.user.id,
				repliedTo: formData?.replyedMessageId || undefined,
			})
		} catch ({ status, response }) {
			handlePbConnectionIssue(status)

			response.data.content = {
				value: messageContent,
				...(response.data.content || {}),
			}

			return fail(response.code, {
				message: response.message,
				...response.data,
			})
		}
	},
}

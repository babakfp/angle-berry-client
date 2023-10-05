import { fail } from "@sveltejs/kit"
import { handleCommunicationFailure } from "$utils/pb/helpers.js"

export const actions = {
    default: async ({ locals, request }) => {
        const formData = Object.fromEntries(await request.formData())
        let { messageContent } = formData
        if (!messageContent) return
        if (messageContent) {
            messageContent = messageContent.trim()
            messageContent = messageContent.replace(/(?:\r\n|\r|\n)/g, "<br>")
        }

        try {
            if (!formData?.messageIdToEdit) {
                await locals.pb.collection("messages").create({
                    content: messageContent,
                    user: locals.user.id,
                    repliedTo: formData?.replyedMessageId || undefined,
                })
            } else {
                await locals.pb
                    .collection("messages")
                    .update(formData.messageIdToEdit, {
                        content: messageContent,
                    })
            }
        } catch ({ status, response }) {
            handleCommunicationFailure(status)

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

import { redirect, fail } from "@sveltejs/kit"
import { handleOfflineFailure } from "$utilities/pb"

export const actions = {
    default: async ({ locals, request }) => {
        if (!locals.user) throw redirect(303, "/login")

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
            handleOfflineFailure(status)

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

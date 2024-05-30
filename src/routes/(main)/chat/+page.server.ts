import { fail, redirect } from "@sveltejs/kit"
import { superValidate } from "sveltekit-superforms/server"
import { pbHandleFormActionError } from "$lib/utilities/pb/helpers"
import { schema } from "./schema"

export const actions = {
    default: async ({ locals, request }) => {
        if (!locals.loggedInUser) redirect(303, "/login")

        const form = await superValidate(request, schema)

        if (!form.valid) {
            return fail(400, { form })
        }

        form.data.messageContent = form.data.messageContent.replace(
            /(?:\r\n|\r|\n)/g,
            "<br>",
        )

        try {
            if (!form.data.messageIdToEdit) {
                await locals.pb.collection("messages").create({
                    content: form.data.messageContent,
                    user: locals.loggedInUser.id,
                    repliedTo: form.data.replyedMessageId,
                })
            } else {
                await locals.pb
                    .collection("messages")
                    .update(form.data.messageIdToEdit, {
                        content: form.data.messageContent,
                    })
            }
        } catch (e) {
            const e2 = pbHandleFormActionError(e, form)
            if (e2) return e2
            throw e
        }
    },
}

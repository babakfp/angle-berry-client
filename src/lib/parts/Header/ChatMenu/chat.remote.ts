import { redirect } from "@sveltejs/kit"
import * as v from "valibot"
import { resolve } from "$app/paths"
import { form, getRequestEvent } from "$app/server"
import { pbInvalid } from "$lib/utilities/pb"

const schema = v.object({
    messageContent: v.optional(
        v.pipe(v.string(), v.trim(), v.minLength(1)),
        "",
    ),
    messageIdToEdit: v.optional(v.string()),
    replyedMessageId: v.optional(v.string()),
})

export const chat = form(schema, async (data, issue) => {
    const { locals } = getRequestEvent()

    if (!locals.loggedInUser) {
        redirect(401, resolve("/login"))
    }

    data.messageContent = data.messageContent.replace(/(?:\r\n|\r|\n)/g, "<br>")

    try {
        if (!data.messageIdToEdit) {
            await locals.pb.collection("messages").create({
                content: data.messageContent,
                user: locals.loggedInUser.id,
                repliedTo: data.replyedMessageId,
            })
        } else {
            await locals.pb
                .collection("messages")
                .update(data.messageIdToEdit, {
                    content: data.messageContent,
                })
        }
    } catch (e) {
        pbInvalid(e, issue)
    }
})

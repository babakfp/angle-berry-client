import { valibot } from "sveltekit-superforms/adapters"
import * as v from "valibot"

export const schema = valibot(
    v.object({
        messageContent: v.optional(
            v.pipe(v.string(), v.trim(), v.minLength(1)),
            "",
        ),
        messageIdToEdit: v.optional(v.string()),
        replyedMessageId: v.optional(v.string()),
    }),
)

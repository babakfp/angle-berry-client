import { zod } from "sveltekit-superforms/adapters"
import { z } from "zod"

export const schema = zod(
    z.object({
        messageContent: z.string().trim().min(1).default(""),
        messageIdToEdit: z.string().optional(),
        replyedMessageId: z.string().optional(),
    }),
)

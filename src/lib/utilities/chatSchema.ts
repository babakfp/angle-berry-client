import { z } from "zod"

export const chatSchema = z.object({
    messageContent: z.string().trim().min(1).default(""),
    messageIdToEdit: z.string().optional(),
    replyedMessageId: z.string().optional().default(""),
})

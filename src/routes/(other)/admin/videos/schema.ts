import { z } from "zod"

export const deleteSchema = z.object({
    videos: z.string().array().max(100).default([]),
})

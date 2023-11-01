import { z } from "zod"

export const schema = z.object({
    name: z.string().min(4).max(14).default(""),
    price: z.number().min(0).max(1000).default(0),
    invites: z.number().min(0).max(1000).default(0),
    videos: z.string().array().max(100).default([]),
})

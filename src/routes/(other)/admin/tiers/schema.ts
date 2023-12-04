import { z } from "zod"

export const schemaCreateTier = z.object({
    name: z.string().trim().min(4).max(14).default(""),
    price: z.number().min(0).max(1000).default(0),
    invites: z.number().min(0).max(1000).default(0),
    videos: z.string().array().max(100).default([]),
})

export const schemaUpdateTier = schemaCreateTier

export const schemaDeleteTier = z.object({
    ids: z.string().array().default([]),
})

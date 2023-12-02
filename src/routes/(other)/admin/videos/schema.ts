import { z } from "zod"

export const deleteSchema = z.object({
    videos: z.string().array().max(100).default([]),
})

export const uploadedVideosSchema = z
    .object({
        size: z.number(),
        type: z.string(),
        name: z.string(),
        lastModified: z.number(),
    })
    .array()
    .min(0)
    .max(100)
    .default([])

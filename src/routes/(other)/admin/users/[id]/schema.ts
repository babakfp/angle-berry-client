import { z } from "zod"

export const schema = z.object({
    isAdmin: z.boolean(),
    retainedTiers: z.string().array().default([]),
})

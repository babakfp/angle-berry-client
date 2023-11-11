import { z } from "zod"

// TODO: For user dashbaord: add changing password feature.
export const schema = z.object({
    isAdmin: z.boolean(),
    retainedTiers: z.string().array().default([]),
})
// TODO: Banning users

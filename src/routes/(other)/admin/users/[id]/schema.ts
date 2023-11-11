import { z } from "zod"

// password
// passwordConfirm
export const schema = z.object({
    isAdmin: z.boolean(),
    retainedTiers: z.string().array().default([]),
})
// Banning users

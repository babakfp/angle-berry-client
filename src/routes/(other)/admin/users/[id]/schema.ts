import { zod } from "sveltekit-superforms/adapters"
import { z } from "zod"

export const schema = zod(
    z.object({
        isAdmin: z.boolean(),
        retainedTiers: z.string().array().default([]),
    }),
)

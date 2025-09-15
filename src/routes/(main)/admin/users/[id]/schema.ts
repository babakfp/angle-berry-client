import { valibot } from "sveltekit-superforms/adapters"
import * as v from "valibot"

export const schema = valibot(
    v.object({
        isAdmin: v.boolean(),
        retainedTiers: v.optional(v.array(v.string()), []),
    }),
)

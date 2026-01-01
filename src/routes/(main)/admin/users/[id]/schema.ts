import * as v from "valibot"

export const schema = v.object({
    id: v.string(),
    isAdmin: v.boolean(),
    retainedTiers: v.optional(v.array(v.string()), []),
})

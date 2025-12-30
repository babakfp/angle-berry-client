import * as v from "valibot"

export const schema = v.object({
    isAdmin: v.boolean(),
    retainedTiers: v.optional(v.array(v.string()), []),
})

import { valibot } from "sveltekit-superforms/adapters"
import * as v from "valibot"
import { TIERS_RECORD_VISIBILITY_OPTIONS } from "$lib/utilities/pb"

const create = valibot(
    v.object({
        name: v.optional(
            v.pipe(v.string(), v.trim(), v.minLength(4), v.maxLength(14)),
            "",
        ),
        price: v.optional(
            v.pipe(v.number(), v.minValue(0), v.maxValue(1000)),
            0,
        ),
        invites: v.optional(
            v.pipe(v.number(), v.minValue(0), v.maxValue(1000)),
            0,
        ),
        videos: v.optional(v.pipe(v.array(v.string()), v.maxLength(100)), []),
        visibility: v.optional(
            v.enum(TIERS_RECORD_VISIBILITY_OPTIONS),
            TIERS_RECORD_VISIBILITY_OPTIONS.public,
        ),
    }),
)

export const schema = {
    create,
    update: create,
    delete: {
        single: valibot(
            v.object({
                id: v.string(),
            }),
        ),
        multiple: valibot(
            v.object({
                ids: v.optional(v.array(v.string()), []),
            }),
        ),
    },
}

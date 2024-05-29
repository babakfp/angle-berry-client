import { zod } from "sveltekit-superforms/adapters"
import { z } from "zod"
import { TiersVisibilityOptions } from "@/lib/utilities/pb/types"

const create = zod(
    z.object({
        name: z.string().trim().min(4).max(14).default(""),
        price: z.number().min(0).max(1000).default(0),
        invites: z.number().min(0).max(1000).default(0),
        videos: z.string().array().max(100).default([]),
        visibility: z
            .nativeEnum(TiersVisibilityOptions)
            .default(TiersVisibilityOptions.public),
    }),
)

export const schema = {
    create,
    update: create,
    delete: {
        single: zod(
            z.object({
                id: z.string(),
            }),
        ),
        multiple: zod(
            z.object({
                ids: z.string().array().default([]),
            }),
        ),
    },
}

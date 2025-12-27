import { valibot } from "sveltekit-superforms/adapters"
import * as v from "valibot"

export const AuthSchema = v.object({
    username: v.optional(
        v.pipe(
            v.string(),
            v.trim(),
            v.minLength(4),
            v.maxLength(12),
            v.regex(/^[a-z]+$/, "Only lowercase Latin letters are allowed"),
        ),
        "",
    ),
    password: v.optional(
        v.pipe(v.string(), v.minLength(8), v.maxLength(32)),
        "",
    ),
})

export const schema = valibot(AuthSchema)

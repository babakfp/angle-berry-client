import { valibot } from "sveltekit-superforms/adapters"
import * as v from "valibot"

export const usernamePattern = /^[a-z]+$/
export const minUsernameLength = 4
export const maxUsernameLength = 12
export const minPasswordLength = 8
export const maxPasswordLength = 32

export const schema = valibot(
    v.object({
        username: v.optional(
            v.pipe(
                v.string(),
                v.trim(),
                v.minLength(minUsernameLength),
                v.maxLength(maxUsernameLength),
                v.regex(
                    usernamePattern,
                    "Only lowercase Latin letters are allowed",
                ),
            ),
            "",
        ),
        password: v.optional(
            v.pipe(
                v.string(),
                v.minLength(minPasswordLength),
                v.maxLength(maxPasswordLength),
            ),
            "",
        ),
    }),
)

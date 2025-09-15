import { valibot } from "sveltekit-superforms/adapters"
import * as v from "valibot"

const USERNAME_PATTERN = /^[a-z]+$/
const MIN_USERNAME_LENGTH = 4
const MAX_USERNAME_LENGTH = 12
const MIN_PASSWORD_LENGTH = 8
const MAX_PASSWORD_LENGTH = 32

export const schema = valibot(
    v.object({
        username: v.optional(
            v.pipe(
                v.string(),
                v.trim(),
                v.minLength(MIN_USERNAME_LENGTH),
                v.maxLength(MAX_USERNAME_LENGTH),
                v.regex(
                    USERNAME_PATTERN,
                    "Only lowercase Latin letters are allowed",
                ),
            ),
            "",
        ),
        password: v.optional(
            v.pipe(
                v.string(),
                v.minLength(MIN_PASSWORD_LENGTH),
                v.maxLength(MAX_PASSWORD_LENGTH),
            ),
            "",
        ),
    }),
)

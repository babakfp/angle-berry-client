import { valibot } from "sveltekit-superforms/adapters"
import * as v from "valibot"

const USERNAME_PATTERN = /^[a-z]+$/
const USERNAME_MIN_LENGTH = 4
const USERNAME_MAX_LENGTH = 12
const PASSWORD_MIN_LENGTH = 8
const PASSWORD_MAX_LENGTH = 32

export const schema = valibot(
    v.object({
        username: v.optional(
            v.pipe(
                v.string(),
                v.trim(),
                v.minLength(USERNAME_MIN_LENGTH),
                v.maxLength(USERNAME_MAX_LENGTH),
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
                v.minLength(PASSWORD_MIN_LENGTH),
                v.maxLength(PASSWORD_MAX_LENGTH),
            ),
            "",
        ),
    }),
)

import { zod } from "sveltekit-superforms/adapters"
import { z } from "zod"

export const usernamePattern = /^[a-z]+$/
export const minUsernameLength = 4
export const maxUsernameLength = 12
export const minPasswordLength = 8
export const maxPasswordLength = 32

export const schema = zod(
    z.object({
        username: z
            .string()
            .trim()
            .min(minUsernameLength)
            .max(maxUsernameLength)
            .regex(usernamePattern, "Only lowercase Latin letters are allowed")
            .default(""),
        password: z
            .string()
            .min(minPasswordLength)
            .max(maxPasswordLength)
            .default(""),
    }),
)

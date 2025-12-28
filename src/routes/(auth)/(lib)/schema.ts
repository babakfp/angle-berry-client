import * as v from "valibot"

export const schema = v.object({
    // TODO: maybe remove `optional` or replace it with `fallback`?
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

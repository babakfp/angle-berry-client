import * as v from "valibot"
import { files } from "$lib/utilities/schema/files.js"

export const formats = ["mp4", "avi", "mkv"]
export const maxSizeLimitInBytes = 1_000_000_000

export const schema = {
    upload: v.object({
        videos: files({
            formats,
            size: {
                max: maxSizeLimitInBytes,
            },
        }),
    }),
    delete: v.object({
        videos: v.optional(v.pipe(v.array(v.string()), v.maxLength(100)), []),
    }),
}

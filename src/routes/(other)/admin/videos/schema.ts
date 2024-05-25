import { files } from "@/lib/utilities/zod/files.js"
import { zod } from "sveltekit-superforms/adapters"
import { z } from "zod"

export const formats = ["mp4", "avi", "mkv"]
export const maxSizeLimitInBytes = 1000000000

export const schema = {
    upload: zod(
        z.object({
            videos: files({
                formats,
                size: {
                    max: maxSizeLimitInBytes,
                },
            }),
        }),
    ),
    delete: zod(
        z.object({
            videos: z.string().array().max(100).default([]),
        }),
    ),
}

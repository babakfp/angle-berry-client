import { z } from "zod"
import type { FileServer } from "$utilities/FileServer"

export const schema = {
    delete: z.object({
        videos: z.string().array().max(100).default([]),
    }),
}

export const videoFormats = ".mp4,.avi,.mkv"
export const videoMaxSizeLimitBytes = 1000000000

const isFileValid = (file: FileServer) => {
    if (file.name === "undefined" || file.size === 0) {
        return false
    }
    return true
}

export const isFileListValid = (files: FileServer[]) =>
    Array.from(files).every(isFileValid)

export const zFile = z.object({
    size: z.number(),
    type: z.string(),
    name: z.string(),
    lastModified: z.number(),
})

export const isFilesSchemaValid = (files: unknown) => {
    if (!Array.isArray(files)) {
        return false
    }

    for (const file of files) {
        try {
            zFile.parse(file)
        } catch (e) {
            return false
        }
    }

    return true
}

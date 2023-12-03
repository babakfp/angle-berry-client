import { z } from "zod"
import type { FileServer } from "$utilities/FileServer"

export const deleteSchema = z.object({
    videos: z.string().array().max(100).default([]),
})

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

export const isFilesSchemaValid = (files: any) => {
    let isValid = true
    for (const file of files) {
        try {
            zFile.parse(file)
        } catch (e) {
            isValid = false
        }
    }
    return isValid
}

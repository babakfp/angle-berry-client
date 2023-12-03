import { z } from "zod"
import type { FileServer } from "$utilities/FileServer"
import { formatBytes } from "$utilities/formatBytes"

export const deleteSchema = z.object({
    videos: z.string().array().max(100).default([]),
})

export const videoFormats = ".mp4,.avi,.mkv"
const videoMaxSizeLimitBytes = 1000000000

const isFileValid = (file: File | FileServer) => {
    if (file.name === "undefined" || file.size === 0) {
        return false
    }
    return true
}

const isFileListValid = (files: FileList | FileServer[]) =>
    Array.from(files).every(isFileValid)

const zFile = z.object({
    size: z.number(),
    type: z.string(),
    name: z.string(),
    lastModified: z.number(),
})

const isFilesSchemaValid = (files: any) => {
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

export const uploadSchema = z.object({
    videos: z.any().superRefine((v, ctx) => {
        const isObject = !!v && typeof v === "object" && !Array.isArray(v)

        if (isObject && isFilesSchemaValid(v) && isFileListValid(v)) {
            const files = v as FileList

            const isAnyFileTooLarge = !Array.from(files).every(
                file => (file as File).size <= videoMaxSizeLimitBytes,
            )

            if (isAnyFileTooLarge) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: `File size can't be above ${formatBytes(
                        videoMaxSizeLimitBytes,
                    )}`,
                    fatal: true,
                })
                return z.NEVER
            } else {
                const containsInvalidExtensions = Array.from(files).some(
                    file => {
                        const extension = file.name.split(".").pop()!
                        return !videoFormats.includes(extension)
                    },
                )
                if (containsInvalidExtensions) {
                    ctx.addIssue({
                        code: z.ZodIssueCode.custom,
                        message: `Only formats ${formatBytes(
                            videoMaxSizeLimitBytes,
                        )} allowed!`,
                        fatal: true,
                    })
                    return z.NEVER
                }
            }
        } else {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Can't be empty!",
                fatal: true,
            })
            return z.NEVER
        }
    }),
})

import { formatBytes } from "$utilities/formatBytes"
import {
    isFileListValid,
    isFilesSchemaValid,
} from "../../routes/(other)/admin/videos/schema"
import type { FileServer } from "./FileServer"

export const validateFiles = (
    files: unknown,
    maxSizeLimitInBytes: number | undefined,
    allowedFormats: string,
):
    | { isValid: false; message: string }
    | { isValid: true; files: FileServer[] } => {
    if (
        !(isFilesSchemaValid(files) && isFileListValid(files as FileServer[]))
    ) {
        return { isValid: false, message: "Can't be empty!" }
    }

    const typedFiles = files as FileServer[]

    if (maxSizeLimitInBytes) {
        const isAnyFileTooLarge = !typedFiles.every(
            file => (file as File).size <= maxSizeLimitInBytes,
        )

        if (isAnyFileTooLarge) {
            return {
                isValid: false,
                message: `File size can't be above ${formatBytes(
                    maxSizeLimitInBytes,
                )}`,
            }
        }
    }

    const containsInvalidExtensions = typedFiles.some(file => {
        const extension = file.name.split(".").pop()!
        return !allowedFormats.includes(extension)
    })

    if (containsInvalidExtensions) {
        return {
            isValid: false,
            message: `Only formats ${allowedFormats} allowed!`,
        }
    }

    return { isValid: true, files: typedFiles }
}

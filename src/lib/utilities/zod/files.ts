import { formatBytes } from "@/lib/utilities/formatBytes"
import { z } from "zod"

export type Options = {
    formats?: string[]
    size?: {
        min?: number
        max?: number
    }
}

/**
 * The `size` argument properties are considered to contain bytes as numbers.
 */
export const files = (options?: Options) =>
    z
        .instanceof(File, { message: "Can't be empty!" })
        .superRefine((file, ctx) => {
            const addIssue = (message: string) => {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message,
                    fatal: true,
                })

                return z.NEVER
            }

            if (options?.formats) {
                if (!file.name.includes(".")) {
                    return addIssue(
                        `Only formats ${options.formats} allowed! File "${file.name}" does not contain a format.`,
                    )
                }

                const fileNameSegments = file.name.split(".")
                const fileNameExtension =
                    fileNameSegments[fileNameSegments.length - 1]

                if (!options.formats.includes(fileNameExtension)) {
                    return addIssue(
                        `Only (${options.formats.join(", ")}) formats allowed! Got "${fileNameExtension}".`,
                    )
                }
            }

            if (options?.size?.max && file.size > options.size.max) {
                return addIssue(
                    `File size can't be above ${formatBytes(options.size.max)}`,
                )
            }

            if (options?.size?.min && file.size > options.size.min) {
                return addIssue(
                    `File size can't be under ${formatBytes(options.size.min)}`,
                )
            }
        })
        .array()
        .min(1, "Can't be empty!")

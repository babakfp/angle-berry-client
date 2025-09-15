import * as v from "valibot"
import { formatBytes } from "$lib/utilities/formatBytes"

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
    v.pipe(
        v.array(
            v.pipe(
                v.file("Can't be empty!"),
                v.rawCheck(({ addIssue, dataset }) => {
                    if (!dataset.typed) return

                    if (options?.formats) {
                        if (!dataset.value.name.includes(".")) {
                            return addIssue({
                                message: `Only formats ${options.formats} allowed! File "${dataset.value.name}" does not contain a format.`,
                            })
                        }

                        const fileNameSegments = dataset.value.name.split(".")
                        const fileNameExtension =
                            fileNameSegments[fileNameSegments.length - 1]

                        if (!options.formats.includes(fileNameExtension)) {
                            return addIssue({
                                message: `Only (${options.formats.join(", ")}) formats allowed! Got "${fileNameExtension}".`,
                            })
                        }
                    }

                    if (
                        options?.size?.max
                        && dataset.value.size > options.size.max
                    ) {
                        return addIssue({
                            message: `File size can't be above ${formatBytes(options.size.max)}`,
                        })
                    }

                    if (
                        options?.size?.min
                        && dataset.value.size > options.size.min
                    ) {
                        return addIssue({
                            message: `File size can't be under ${formatBytes(options.size.min)}`,
                        })
                    }
                }),
            ),
        ),
        v.minLength(1, "Can't be empty!"),
    )

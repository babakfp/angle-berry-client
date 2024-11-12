/** Error: Connection Refused */
export type ErrorConnectionRefused = Error & {
    cause: {
        errno: number
        code: "ECONNREFUSED"
        syscall: string
        address: string
        port: number
    }
}

/**
 * Checks if the given error is a connection refused error. Whenever trying to
 *     fetch a URL, if the connection is refused, the error is thrown.
 */
export const isErrorConnectionRefused = (
    error: unknown,
): error is ErrorConnectionRefused => {
    return (
        error instanceof Error &&
        "cause" in error &&
        (error as ErrorConnectionRefused).cause.code === "ECONNREFUSED"
    )
}

import { error, invalid } from "@sveltejs/kit"
import { form } from "$app/server"
import { ClientResponseError } from "$lib/utilities/pb"

/**
 * @throws No need to return, it'll throw an error.
 */
export const pbInvalid = (
    e: unknown,
    issue: Parameters<Parameters<typeof form>[1]>[1],
    callback?: (e: ClientResponseError) => "skip" | void,
) => {
    if (!(e instanceof ClientResponseError)) {
        invalid("Something went wrong!")
    }
    if (e.response.status === 0) {
        invalid("Database communication failure!")
    }

    if (callback?.(e) === "skip") return

    Object.entries(
        e.response.data as Record<string, { message?: string } | undefined>,
    ).forEach(([k, v]) => {
        if (!v?.message) return
        if (k === "identity") invalid(issue.username(v.message))
        if (!issue[k]) return
        invalid(issue[k](v.message))
    })

    invalid(e.response.message)
}

export const pbHandleError = (
    e: unknown,
    callback?: (e: ClientResponseError) => "skip" | void,
) => {
    if (!(e instanceof ClientResponseError)) {
        error(500, {
            message: "Something went wrong!",
        })
    }

    if (e.response.status === 0) {
        error(500, {
            message: "Database communication failure!",
        })
    }

    if (callback?.(e) === "skip") return

    error(e.response.status, {
        message: e.response.message,
    })
}

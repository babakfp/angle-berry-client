import { error, fail, invalid } from "@sveltejs/kit"
import { form } from "$app/server"
import { ClientResponseError } from "$lib/utilities/pb"

/**
 * @throws No need to return, it'll throw an error.
 */
export const pbInvalid = (
    e: unknown,
    issue: Parameters<Parameters<typeof form>[1]>[1],
    callbackAtStart?: (e: ClientResponseError) => "skip" | void,
) => {
    if (!(e instanceof ClientResponseError)) {
        invalid("Something went wrong!")
    }
    if (e.response.status === 0) {
        invalid("Database communication failure!")
    }

    if (callbackAtStart?.(e) === "skip") return

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

export const pbHandleFormActionError = <T>(e: unknown, data?: T) => {
    if (!(e instanceof ClientResponseError)) {
        return fail(500, {
            message: "Something went wrong!",
            ...data,
        })
    }

    if (e.status === 0) {
        return fail(500, {
            message: "Database communication failure!",
            ...data,
        })
    }

    return fail(e.response.status, {
        message: e.response.message,
        pb: e.response.data,
        ...data,
    })
}

export const pbHandleClientResponseError = (e: ClientResponseError) => {
    if (e.status === 0) {
        error(500, {
            type: "failure",
            message: `Database communication failure! ${e.message}`,
        })
    }

    if (e.response.status && e.response.message) {
        error(e.response.status, e.response.message)
    }

    throw e
}

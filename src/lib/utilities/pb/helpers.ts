import { error, fail, invalid } from "@sveltejs/kit"
import { ClientResponseError } from "$lib/utilities/pb"

export const pbInvalid = (
    e: unknown,
    callback?: (e: ClientResponseError) => void,
) => {
    if (!(e instanceof ClientResponseError)) {
        invalid("Something went wrong!")
    }
    if (e.response.status === 0) {
        invalid("Database communication failure!")
    }

    callback?.(e)

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

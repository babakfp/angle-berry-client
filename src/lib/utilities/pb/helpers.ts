import { error, fail } from "@sveltejs/kit"
import { ClientResponseError } from "$lib/utilities/pb"

export const pbHandleFormActionError = <T>(e: unknown, data?: T) => {
    if (!(e instanceof ClientResponseError)) {
        return fail(500, {
            ...data,
            message: "Something went wrong!",
        })
    }

    if (e.status === 0) {
        return fail(500, {
            ...data,
            message: "Database communication failure!",
        })
    }

    return fail(e.response.status, {
        ...data,
        message: e.response.message,
        pb: e.response.data,
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

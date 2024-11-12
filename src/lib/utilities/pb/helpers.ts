import { error, fail } from "@sveltejs/kit"
import type { SuperValidated } from "sveltekit-superforms"
import { ClientResponseError } from "$lib/utilities/pb"
import { isErrorConnectionRefused } from "./errorConnectionRefused"

export const pbHandleFormActionError = (
    e: unknown | ClientResponseError,
    formData: SuperValidated<Record<string, unknown>> | Record<string, never>,
) => {
    if (isErrorConnectionRefused(e)) {
        return fail(500, {
            ...formData,
            message: "Database communication failure!",
        })
    }

    if (
        e instanceof ClientResponseError &&
        e.response.code &&
        e.response.message
    ) {
        return fail(e.response.code, {
            ...formData,
            message: e.response.message,
            pb: e.response.data,
        })
    }
}

export const pbHandleClientResponseError = (e: ClientResponseError) => {
    if (isErrorConnectionRefused(e)) {
        error(500, {
            type: "failure",
            message: "Database communication failure!",
        })
    }

    if (e.response.code && e.response.message) {
        error(e.response.code, e.response.message)
    }

    throw e
}

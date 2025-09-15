import { error, fail } from "@sveltejs/kit"
import type { SuperValidated } from "sveltekit-superforms"
import { ClientResponseError } from "$lib/utilities/pb"

export const pbHandleFormActionError = (
    e: unknown | ClientResponseError,
    formData: SuperValidated<Record<string, unknown>> | Record<string, never>,
) => {
    if (e instanceof ClientResponseError) {
        if (e.status === 0) {
            return fail(500, {
                ...formData,
                message: "Database communication failure!",
            })
        }

        if (e.response.status && e.response.message) {
            return fail(e.response.status, {
                ...formData,
                message: e.response.message,
                pb: e.response.data,
            })
        }
    }
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

import { ClientResponseError } from "@/lib/utilities/pb/types"
import { error, fail } from "@sveltejs/kit"
import type { SuperValidated } from "sveltekit-superforms"

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
        if (e.response.code && e.response.message) {
            return fail(e.response.code, {
                ...formData,
                message: e.response.message,
                pb: e.response.data,
            })
        }
    }
}

export const pbHandleClientResponseError = (e: ClientResponseError) => {
    if (e.status === 0) {
        error(500, "Database communication failure!")
    }
    if (e.response.code && e.response.message) {
        error(e.response.code, e.response.message)
    }
    throw e
}

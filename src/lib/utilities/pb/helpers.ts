import { error, fail } from "@sveltejs/kit"
import type { SuperValidated } from "sveltekit-superforms"
import type { AnyZodObject } from "zod"
import { ClientResponseError } from "$utilities/pb/types"

export const pbHandleFormActionError = (
    e: unknown | ClientResponseError,
    formData: SuperValidated<AnyZodObject> | Record<string, never>,
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

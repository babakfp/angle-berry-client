import { error, fail } from "@sveltejs/kit"
import type { TiersResponse, ClientResponseError } from "$utilities/pb-types"

export const pbHandleFormActionError = (
    e: unknown | ClientResponseError,
    formData: any,
) => {
    if ((e as ClientResponseError).status === 0) {
        return fail(500, {
            ...formData,
            message: "Database communication failure!",
        })
    }
    if (
        (e as ClientResponseError).response.code &&
        (e as ClientResponseError).response.message
    ) {
        return fail((e as ClientResponseError).response.code, {
            ...formData,
            message: (e as ClientResponseError).response.message,
            pb: (e as ClientResponseError).response.data,
        })
    }
}

export const pbHandleClientResponseError = (e: ClientResponseError) => {
    if (e.status === 0) {
        throw error(500, "Database communication failure!")
    }
    if (e.response.code && e.response.message) {
        throw error(e.response.code, e.response.message)
    }
}

export function getPreviewTierId(tiers: TiersResponse[]) {
    return tiers.filter(tier => tier.invites === 0 && tier.price === 0)[0]?.id
}

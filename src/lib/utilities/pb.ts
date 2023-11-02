import { error } from "@sveltejs/kit"
import type { TiersResponse } from "$utilities/pb-types"

export function handleOfflineFailure(status: number) {
    if (status === 0) throw error(500, "Database communication failure!")
}

export function getPreviewTierId(tiers: TiersResponse[]) {
    return tiers.filter(tier => tier.invites === 0 && tier.price === 0)[0]?.id
}

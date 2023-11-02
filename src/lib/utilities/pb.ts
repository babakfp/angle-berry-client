import { error } from "@sveltejs/kit"

export function handleOfflineFailure(status: number) {
    if (status === 0) throw error(500, "Database communication failure!")
}

export function getPreviewTierId(tiers) {
    return tiers.filter(tier => tier.invites === 0 && tier.price === 0)[0]?.id
}

import { error } from "@sveltejs/kit"

export function handleOfflineFailure(status) {
    if (status === 0) {
        throw error(500, "Database communication failure!")
    }
}

export function getPreviewTierId(tiers) {
    const tier = tiers.filter(tier => tier.invites === 0 && tier.price === 0)[0]
    return tier.id
}

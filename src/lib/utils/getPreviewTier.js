/**
 * @param {Tier[]} tiers
 * @returns {Tier}
 */
export function getPreviewTier(tiers) {
	return tiers.filter(
		tier =>
			tier.name === "Preview" || (tier.price === 0 && tier.invites === 0)
	)[0]
}

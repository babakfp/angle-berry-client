export async function load({ locals: { user, tiers, previewTierId } }) {
    return { user, tiers, previewTierId }
}

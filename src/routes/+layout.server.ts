export const load = async ({ locals: { user, tiers, previewTierId } }) => {
    return { user, tiers, previewTierId }
}

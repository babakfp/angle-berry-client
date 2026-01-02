<script lang="ts">
    import * as TiersTable from "$lib/components/TiersTable"
    import { getLoggedInUser } from "$lib/remotes/getLoggedInUser.remote"
    import { getPreviewTierId } from "$lib/remotes/getPreviewTierId.remote"
    import { loadTiers } from "$lib/remotes/loadTiers.remote"

    const loggedInUser = await getLoggedInUser()
    const tiers = await loadTiers()
    const previewTierId = await getPreviewTierId()
</script>

<svelte:head>
    <title>Home</title>
</svelte:head>

{#if previewTierId}
    <p class="mb-8">
        Watch <a class="link" href="/tiers/{previewTierId}">free</a>
        content, and
        <a class="link" href="/how-to-pay">pay</a>
        or
        <a class="link" href="/how-to-invite">invite</a>
        to access premium tiers.
    </p>
{/if}

<TiersTable.Root>
    {#each tiers as tier}
        <TiersTable.Row {loggedInUser} {tier} />
    {/each}
</TiersTable.Root>

<div class="mt-8">
    <a class="link" href="https://t.me/adminTelegramUsername">Contact</a>
</div>

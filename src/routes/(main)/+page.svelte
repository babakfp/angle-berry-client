<script lang="ts">
    import * as TiersTable from "$lib/components/TiersTable"

    let { data } = $props()
</script>

<svelte:head>
    <title>Home</title>
</svelte:head>

{#if data.previewTierId}
    <p class="mb-8">
        Watch <a class="link" href="/tiers/{data.previewTierId}">free</a>
        content, and
        <a class="link" href="/how-to-pay">pay</a>
        or
        <a class="link" href="/how-to-invite">invite</a>
        to access premium tiers.
    </p>
{/if}

<TiersTable.Root>
    {#each data.tiers as tier}
        <TiersTable.Row loggedInUser={data.loggedInUser} {tier} />
    {/each}
</TiersTable.Root>

<div class="mt-8">
    <a class="link" href="https://t.me/adminTelegramUsername">Contact</a>
</div>

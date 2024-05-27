<script lang="ts">
    import TiersTable from "@/lib/components/TiersTable.svelte"
    import TiersTableRow from "@/lib/components/TiersTableRow.svelte"

    export let data
</script>

<svelte:head>
    <title>Home</title>
</svelte:head>

{#if data.previewTierId}
    <p class="mb-8">
        Watch <a class="link" href="/tiers/{data.previewTierId}">free</a>
        content, and <a class="link" href="/how-to-pay">pay</a> or
        <a class="link" href="/how-to-invite">invite</a> to access premium tiers.
    </p>
{/if}

<TiersTable>
    {#each data.tiers as tier}
        <TiersTableRow loggedInUser={data.loggedInUser} {tier} />
    {/each}
</TiersTable>

<div class="mt-8">
    <a class="link" href="https://t.me/adminTelegramUsername">Contact</a>
</div>

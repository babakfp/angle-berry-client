<script lang="ts">
    import TiersTable from "$components/TiersTable.svelte"
    import TiersTableRow from "$components/TiersTableRow.svelte"

    export let data
</script>

<svelte:head>
    <title>Angle Berry</title>
</svelte:head>

{#if data.previewTierId}
    <p>
        Watch <a class="link" href="/tiers/{data.previewTierId}">free</a>
        content, and <a class="link" href="/how-to-pay">pay</a> or
        <a class="link" href="/how-to-invite">invite</a> to access premium tiers.
    </p>
{/if}

<TiersTable class="mt-8">
    {#each data.tiers as tier}
        <TiersTableRow user={data.user} {tier} />
    {/each}
</TiersTable>

<div class="mt-8">
    <a class="link" href="https://t.me/adminTelegramUsername">Contact</a>
</div>

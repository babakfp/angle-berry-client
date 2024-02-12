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
        You can <a class="link" href="/tiers/{data.previewTierId}">
            watch free content
        </a>
        and for more content, you can get the following tiers:
    </p>
{/if}

<TiersTable class="mt-8">
    {#each data.tiers as tier}
        <TiersTableRow user={data.user} {tier} />
    {/each}
</TiersTable>

<div class="mt-8">
    <!-- prettier-ignore -->
    <p>
		You can get the premium tiers by <a class="link" href="/how-to-pay">paying</a> or
		<a class="link" href="/how-to-invite">inviting</a> new users to this website.
	</p>

    <p>
        You can contact us via Telegram
        <a class="link" href="https://t.me/adminTelegramUsername">
            @adminTelegramUsername
        </a>.
    </p>
</div>

<script>
    import { page } from "$app/stores"
    import TierTableRow from "$comps/TierTableRow.svelte"

    export let currentTier = null
    export let className = ""
    export { className as class }
</script>

<div class="{className} overflow-x-auto whitespace-nowrap rounded shadow-md">
    <table class="w-full text-left text-sm text-gray-400">
        <thead class="bg-white/10 text-xs uppercase">
            <tr>
                <th class="px-6 py-3 pt-3.5">TIER</th>
                <th class="px-6 py-3 pt-3.5">PRICE</th>
                <th class="px-6 py-3 pt-3.5 text-right">ACCESS</th>
            </tr>
        </thead>
        <tbody>
            {#if !!currentTier}
                <TierTableRow {currentTier} isShowingSingleTier={true} />
            {:else}
                {#each $page.data.tiers as tier}
                    <TierTableRow currentTier={tier} />
                {/each}
            {/if}
        </tbody>
    </table>
</div>

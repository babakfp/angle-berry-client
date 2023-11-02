<script lang="ts">
    import { page } from "$app/stores"
    import type { TiersResponse } from "$utilities/pb-types"
    import { Table, Tbody, Thead, Tr, Th } from "$components/table/index"
    import TierTableRow from "$components/TierTableRow.svelte"

    export let currentTier: TiersResponse | null = null
    export let _class = ""
    export { _class as class }
</script>

<Table class={_class}>
    <Thead>
        <Tr>
            <Th>TIER</Th>
            <Th>PRICE</Th>
            <Th class="text-right">ACCESS</Th>
        </Tr>
    </Thead>
    <Tbody>
        {#if !!currentTier}
            <TierTableRow {currentTier} isShowingSingleTier={true} />
        {:else}
            {#each $page.data.tiers as tier}
                <TierTableRow currentTier={tier} />
            {/each}
        {/if}
    </Tbody>
</Table>

<script lang="ts">
    import type { TiersResponse } from "$utilities/pb-types"
    import { Table, Tbody, Thead, Tr, Th } from "$components/table/index"
    import TiersTableRow from "$components/TiersTableRow.svelte"

    export let tiers: TiersResponse[]
    export let currentTier: TiersResponse | undefined = undefined
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
            <TiersTableRow tier={currentTier} isShowingSingleTier={true} />
        {:else}
            {#each tiers as tier}
                <TiersTableRow {tier} />
            {/each}
        {/if}
    </Tbody>
</Table>

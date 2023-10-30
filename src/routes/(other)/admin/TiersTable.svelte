<script>
    import { Table, Tbody, Thead, Tr, Th, Td } from "$components/table/index.js"
    import Checkbox from "$components/form/Checkbox.svelte"

    export let tiers
    export let users

    let selectedTierIds = []

    function deleteSelectedTiers() {
        tiers = tiers.filter(t => !selectedTierIds.includes(t.id))
        selectedTierIds = []
    }
</script>

{#if selectedTierIds.length}
    <div class="flex justify-between">
        <button class="btn btn-brand" on:click={deleteSelectedTiers}>
            Delete selected
        </button>

        <button class="btn btn-gray" on:click={() => (selectedTierIds = [])}>
            Clear selection
        </button>
    </div>
{/if}

<Table class="mt-4">
    <Thead>
        <Tr>
            <Th class="!p-0">
                <Checkbox
                    class="relative z-1 items-center px-6 py-3"
                    checked={tiers.length &&
                        selectedTierIds.length === tiers.length}
                    on:change={e => {
                        if (e.target.checked) {
                            selectedTierIds = tiers.map(tier => tier.id)
                        } else {
                            selectedTierIds = []
                        }
                    }}
                    disabled={!tiers.length}
                />
            </Th>
            <Th>TIER</Th>
            <Th>PRICE</Th>
            <Th>INVITES</Th>
            <Th>VIDEOS</Th>
            <Th>USERS</Th>
        </Tr>
    </Thead>
    <Tbody>
        {#each tiers as tier}
            {@const usersWithThisTier = users.filter(user =>
                user.retainedTiers.includes(tier.id),
            )}
            <Tr
                class="relative duration-200 hover:bg-white/10 not-last:border-b not-last:border-white/5"
            >
                <Td class="w-16">
                    <Checkbox
                        class="relative z-1 items-center px-6 py-4"
                        checked={selectedTierIds.includes(tier.id)}
                        bind:group={selectedTierIds}
                        value={tier.id}
                    />
                </Td>
                <Th class="py-4 text-white">
                    {tier.name}
                </Th>
                <Td class="px-6 py-4">
                    ${tier.price}
                </Td>
                <Td class="px-6 py-4">
                    {tier.invites}
                </Td>
                <Td class="px-6 py-4">
                    {tier.videos.length} items
                </Td>
                <Td class="px-6 py-4">
                    {usersWithThisTier.length}
                </Td>
                <a
                    class="absolute inset-0 outline-inset"
                    href="/admin/tiers/{tier.id}"
                />
            </Tr>
        {/each}
    </Tbody>
</Table>

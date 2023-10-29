<script>
    import { Table, Tbody, Thead, Tr, Th, Td } from "$components/table/index.js"
    import Checkbox from "$components/form/Checkbox.svelte"

    export let data

    let selectedTierIds = []
</script>

<Table>
    <Thead>
        <Tr>
            <Th>
                <Checkbox
                    checked={selectedTierIds.length === data.tiers.length}
                    on:click={e => {
                        if (e.target.checked) {
                            selectedTierIds = data.tiers.map(tier => tier.id)
                        } else {
                            selectedTierIds = []
                        }
                    }}
                />
            </Th>
            <Th>TIER</Th>
            <Th>PRICE</Th>
            <Th>INVITES</Th>
            <Th>VIDEOS</Th>
            <Th>USERS</Th>
            <Th class="text-right">ACTIONS</Th>
        </Tr>
    </Thead>
    <Tbody>
        {#each data.tiers as tier}
            {@const usersWithThisTier = data.users.filter(user =>
                user.retainedTiers.includes(tier.id),
            )}
            <Tr
                class="group relative duration-200 hover:bg-white/10 not-last:border-b not-last:border-white/5"
            >
                <Td>
                    <label class="relative z-1 flex items-center px-6 py-4">
                        <Checkbox
                            checked={selectedTierIds.includes(tier.id)}
                            on:click={() => {
                                if (selectedTierIds.includes(tier.id)) {
                                    selectedTierIds = selectedTierIds.filter(
                                        id => id !== tier.id,
                                    )
                                } else {
                                    selectedTierIds = [
                                        ...selectedTierIds,
                                        tier.id,
                                    ]
                                }
                            }}
                        />
                    </label>
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

                <Td class="text-right">
                    <a class="link px-6 py-4" href="/admin/tiers/{tier.id}">
                        View
                    </a>
                </Td>
            </Tr>
        {/each}
    </Tbody>
</Table>

<script lang="ts">
    import {
        Table,
        Tbody,
        Td,
        Th,
        Thead,
        Tr,
        TrOverlayAnchor,
    } from "$lib/components/table/index"

    export let data
</script>

<svelte:head>
    <title>Users</title>
</svelte:head>

<Table class="mt-4">
    <Thead>
        <Tr>
            <Th>USERNAME</Th>
            <Th>TIERS</Th>
            <Th>INVITES</Th>
            <Th>ADMIN</Th>
        </Tr>
    </Thead>
    <Tbody>
        {#each data.users as user}
            <Tr
                class="relative duration-200 [transition-property:background-color] hover:bg-gray-50/10 not-last:border-b not-last:border-gray-50/5"
            >
                <Th class="py-4 text-gray-50">
                    {user.username}
                </Th>
                <Td class="px-6 py-4">
                    {data.tiers
                        .filter((tier) => user.retainedTiers.includes(tier.id))
                        .map((tier) => tier.name)
                        .join(", ")}
                </Td>
                <Td class="px-6 py-4">
                    {user.invitedUsers.length}
                </Td>
                <Td class="px-6 py-4">
                    {user.isAdmin ? "Yes" : "No"}
                </Td>
                <TrOverlayAnchor href="/admin/users/{user.id}" />
            </Tr>
        {/each}
    </Tbody>
</Table>

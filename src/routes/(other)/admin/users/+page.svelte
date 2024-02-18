<script lang="ts">
    import {
        Table,
        Tbody,
        Thead,
        Tr,
        Th,
        Td,
        TrOverlayAnchor,
    } from "$components/table/index"

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
                class="relative duration-200 hover:bg-white/10 not-last:border-b not-last:border-white/5"
            >
                <Th class="py-4 text-white">
                    {user.username}
                </Th>
                <Td class="px-6 py-4">
                    {data.tiers
                        .filter(tier => user.retainedTiers.includes(tier.id))
                        .map(tier => tier.name)
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

<script lang="ts">
    import {
        Table,
        Tbody,
        Td,
        Th,
        Thead,
        Tr,
    } from "$lib/components/table/index"

    let { data } = $props()
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
            <Tr class="not-last:border-b not-last:border-gray-50/5">
                <Th class="text-gray-50" containsAnchor={true}>
                    <a
                        class="link inline-block px-6 py-4 outline-inset"
                        href="/admin/users/{user.id}"
                    >
                        {user.username}
                    </a>
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
            </Tr>
        {/each}
    </Tbody>
</Table>

<script lang="ts">
    import { Table, Tbody, Thead, Tr, Th, Td } from "$components/table/index"
    import Checkbox from "$components/form/Checkbox.svelte"
    import { shrinkHeight } from "$utilities/shrinkHeight"

    export let data

    let selectedUserIds: string[] = []

    function deleteSelectedTiers() {}

    function checkAllCheckboxes(e: Event) {
        if ((e.target as HTMLInputElement).checked) {
            selectedUserIds = data.users.map(user => user.id)
        } else {
            selectedUserIds = []
        }
    }
</script>

{#if selectedUserIds.length}
    <div
        class="flex items-end justify-between"
        transition:shrinkHeight={{ duration: 200 }}
    >
        <button class="btn btn-danger" on:click={deleteSelectedTiers}>
            Delete selected
        </button>

        <button
            class="btn btn-gray-light"
            on:click={() => (selectedUserIds = [])}
        >
            Clear selection
        </button>
    </div>
{/if}

<Table class="mt-4">
    <Thead>
        <Tr>
            <Th class="!p-0">
                <Checkbox
                    class="px-6 py-3"
                    checked={selectedUserIds.length === data.users.length}
                    on:change={checkAllCheckboxes}
                />
            </Th>
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
                <Td class="w-16">
                    <Checkbox
                        class="relative z-1 px-6 py-4"
                        checked={selectedUserIds.includes(user.id)}
                        bind:group={selectedUserIds}
                        value={user.id}
                    />
                </Td>
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
                <a
                    class="absolute inset-0 outline-inset"
                    href="/admin/users/{user.id}"
                    aria-label="View"
                />
            </Tr>
        {/each}
    </Tbody>
</Table>

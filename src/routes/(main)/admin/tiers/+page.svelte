<script lang="ts">
    import toast from "svelte-hot-french-toast"
    import type { ChangeEventHandler } from "svelte/elements"
    import {
        FloatingActions,
        Table,
        Tbody,
        Td,
        TdCheckbox,
        Th,
        ThCheckbox,
        Thead,
        Tr,
    } from "$lib/components/table/index"
    import { capitalizeFirstLetter } from "$lib/utilities/capitalizeFirstLetter"

    let { data, form } = $props()

    $effect(() => {
        if (form?.message) {
            toast.error(form.message, {
                position: "bottom-end",
            })
        }
    })

    let selectedTierIds: string[] = $state([])

    const checkAllCheckboxes: ChangeEventHandler<HTMLInputElement> = (e) => {
        if ((e.target as HTMLInputElement).checked) {
            selectedTierIds = data.tiers.map((tier) => tier.id)
        } else {
            selectedTierIds = []
        }
    }
</script>

<svelte:head>
    <title>Tiers</title>
</svelte:head>

<div class="flex justify-end">
    <a class="btn btn-brand" href="/admin/tiers/create">Create</a>
</div>

<Table class="mt-4">
    <Thead>
        <Tr>
            <ThCheckbox
                checked={!!data.tiers.length &&
                    selectedTierIds.length === data.tiers.length}
                readonly={!data.tiers.length}
                onchange={checkAllCheckboxes}
            />
            <Th>TIER</Th>
            <Th>PRICE</Th>
            <Th>INVITES</Th>
            <Th>VIDEOS</Th>
            <Th>USERS</Th>
            <Th>VISIBILITY</Th>
        </Tr>
    </Thead>
    <Tbody>
        {#each data.tiers as tier}
            {@const usersWithThisTier = data.users.filter((user) =>
                user.retainedTiers.includes(tier.id),
            )}
            <Tr class="not-last:border-b not-last:border-gray-50/5">
                <TdCheckbox
                    checked={selectedTierIds.includes(tier.id)}
                    bind:group={selectedTierIds}
                    value={tier.id}
                />
                <Th class="text-gray-50" containsAnchor={true}>
                    <a
                        class="link inline-block px-6 py-4 outline-inset"
                        href="/admin/tiers/{tier.id}"
                    >
                        {tier.name}
                    </a>
                </Th>
                <Td class="px-6 py-4">
                    ${tier.price}
                </Td>
                <Td class="px-6 py-4">
                    {tier.invites}
                </Td>
                <Td class="px-6 py-4">
                    {tier.videos.length}
                </Td>
                <Td class="px-6 py-4">
                    {usersWithThisTier.length}
                </Td>
                <Td class="px-6 py-4">
                    {capitalizeFirstLetter(tier.visibility)}
                </Td>
            </Tr>
        {/each}
    </Tbody>
</Table>

<FloatingActions
    bind:selectedItemIds={selectedTierIds}
    deleteActionAttribute="?/delete"
    deleteInputNameAttribute="ids"
/>

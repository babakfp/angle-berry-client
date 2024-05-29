<script lang="ts">
    import toast from "svelte-french-toast"
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
        TrOverlayAnchor,
    } from "@/lib/components/table/index"
    import { capitalizeFirstLetter } from "@/lib/utilities/capitalizeFirstLetter"

    export let data
    export let form

    $: if (form?.message) {
        toast.error(form.message, {
            position: "bottom-right",
        })
    }

    let selectedTierIds: string[] = []

    const checkAllCheckboxes = (e: Event) => {
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
                on:change={checkAllCheckboxes}
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
            <Tr
                class="relative duration-200 [transition-property:background-color] hover:bg-white/10 not-last:border-b not-last:border-white/5"
            >
                <TdCheckbox
                    checked={selectedTierIds.includes(tier.id)}
                    bind:group={selectedTierIds}
                    value={tier.id}
                />
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
                    {tier.videos.length}
                </Td>
                <Td class="px-6 py-4">
                    {usersWithThisTier.length}
                </Td>
                <Td class="px-6 py-4">
                    {capitalizeFirstLetter(tier.visibility)}
                </Td>
                <TrOverlayAnchor href="/admin/tiers/{tier.id}" />
            </Tr>
        {/each}
    </Tbody>
</Table>

<FloatingActions
    bind:selectedItemIds={selectedTierIds}
    deleteActionAttribute="?/delete"
    deleteInputNameAttribute="ids"
/>

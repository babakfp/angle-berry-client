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
    import Checkbox from "$components/form/Checkbox.svelte"
    import toast from "svelte-french-toast"
    import { capitalizeFirstLetter } from "$utilities/capitalizeFirstLetter"

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
            selectedTierIds = data.tiers.map(tier => tier.id)
        } else {
            selectedTierIds = []
        }
    }
</script>

<svelte:head>
    <title>Tier</title>
</svelte:head>

<div class="flex justify-between">
    <div class="flex gap-4">
        {#if selectedTierIds.length}
            <form method="post" action="?/delete">
                <button type="submit" class="btn btn-danger">
                    Delete selected
                </button>

                {#each selectedTierIds as id}
                    <input
                        class="hidden"
                        type="checkbox"
                        name="ids"
                        value={id}
                        checked
                    />
                {/each}
            </form>
            <button
                type="button"
                class="btn btn-gray-light"
                on:click={() => (selectedTierIds = [])}
            >
                Clear selection
            </button>
        {/if}
    </div>

    <a class="btn btn-brand" href="/admin/tiers/create">Create</a>
</div>

<Table class="mt-4">
    <Thead>
        <Tr>
            <Th class="!p-0">
                <Checkbox
                    class="px-6 py-3"
                    checked={selectedTierIds.length === data.tiers.length}
                    on:change={checkAllCheckboxes}
                    readonly={!data.tiers.length}
                />
            </Th>
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
            {@const usersWithThisTier = data.users.filter(user =>
                user.retainedTiers.includes(tier.id),
            )}
            <Tr
                class="relative duration-200 hover:bg-white/10 not-last:border-b not-last:border-white/5"
            >
                <Td class="w-16">
                    <Checkbox
                        class="relative z-1 px-6 py-4"
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

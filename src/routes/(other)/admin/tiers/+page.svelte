<script lang="ts">
    import {
        Table,
        Tbody,
        Thead,
        Tr,
        Th,
        ThCheckbox,
        Td,
        TdCheckbox,
        TrOverlayAnchor,
    } from "$components/table/index"
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
            {@const usersWithThisTier = data.users.filter(user =>
                user.retainedTiers.includes(tier.id),
            )}
            <Tr
                class="relative duration-200 hover:bg-white/10 not-last:border-b not-last:border-white/5"
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

<div
    class="fixed inset-x-4 bottom-4 z-50 duration-200 sm:bottom-8
    {!selectedTierIds.length && 'translate-y-full hide'}"
>
    <div
        class="grid gap-2 rounded bg-gray-700 p-4 sm:mx-auto sm:flex sm:max-w-xl sm:items-center sm:justify-between"
    >
        <span class="text-center sm:order-2">
            Selected <b>{selectedTierIds.length}</b>
            {selectedTierIds.length > 1 ? "items" : "item"}
        </span>

        <hr class="my-2 border-t-gray-600 sm:hidden" />

        <button
            type="button"
            class="btn btn-gray"
            on:click={() => (selectedTierIds = [])}
        >
            Clear selection
        </button>

        <form class="sm:order-3" method="post" action="?/delete">
            <button type="submit" class="btn btn-danger w-full">
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
    </div>
</div>

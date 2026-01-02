<script lang="ts">
    import toast from "svelte-hot-french-toast"
    import type { ChangeEventHandler } from "svelte/elements"
    import FormBase from "$lib/components/form/FormBase.svelte"
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
    import { loadTiers } from "$lib/remotes/loadTiers.remote"
    import { capitalizeFirstLetter } from "$lib/utilities/capitalizeFirstLetter"
    import { deleteTiers, loadUsers } from "./data.remote"

    const users = await loadUsers()
    const tiers = await loadTiers()

    const checkAllCheckboxes: ChangeEventHandler<HTMLInputElement> = (e) => {
        if ((e.target as HTMLInputElement).checked) {
            deleteTiers.fields.ids.set(tiers.map((tier) => tier.id))
        } else {
            deleteTiers.fields.ids.set([])
        }
    }

    const formIssue = $derived(
        deleteTiers.fields.allIssues()?.find((issue) => {
            return !issue.path.length
        })?.message,
    )
</script>

<svelte:head>
    <title>Tiers</title>
</svelte:head>

<div class="flex justify-end">
    <a class="btn btn-brand" href="/admin/tiers/create">Create</a>
</div>

<FormBase
    form={deleteTiers}
    enhance={async ({ submit }) => {
        await deleteTiers.validate()

        if (deleteTiers.fields.allIssues()?.length) {
            return
        }

        await submit()

        if (formIssue) {
            toast.error(formIssue)
            return
        }

        deleteTiers.fields.ids.set([])
        toast.success("Deleted successfully!")
    }}
>
    <Table class="mt-4">
        <Thead>
            <Tr>
                <ThCheckbox
                    checked={!!tiers.length
                        && deleteTiers.fields.ids.value()?.length
                            === tiers.length}
                    readonly={!tiers.length}
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
            {#each tiers as tier}
                {@const usersWithThisTier = users.filter((user) =>
                    user.retainedTiers.includes(tier.id),
                )}
                <Tr class="not-last:border-b not-last:border-gray-50/5">
                    <TdCheckbox
                        {...deleteTiers.fields.ids.as("checkbox", tier.id)}
                    />
                    <Th class="text-gray-50" containsAnchor={true}>
                        <a
                            class="link outline-inset inline-block px-6 py-4"
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
        itemsLength={deleteTiers.fields.ids.value()?.length}
        onClear={() => deleteTiers.fields.ids.set([])}
    />
</FormBase>

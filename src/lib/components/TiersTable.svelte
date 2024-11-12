<script lang="ts">
    import type { Snippet } from "svelte"
    import { Table, Tbody, Th, Thead, Tr } from "$lib/components/table/index"

    let {
        class: class_,
        children,
    }: {
        class?: string
        children?: Snippet
    } = $props()
</script>

<Table class={class_}>
    <Thead>
        <Tr>
            <Th>TIER</Th>
            <Th>PRICE</Th>
            <Th class="text-right">ACCESS</Th>
        </Tr>
    </Thead>
    <Tbody>
        {@render children?.()}
    </Tbody>
</Table>

<script lang="ts">
    import { Table, Tbody, Th, Thead, Tr } from "$lib/components/table/index"

    export let class_ = ""
    export { class_ as class }
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
        <slot />
    </Tbody>
</Table>

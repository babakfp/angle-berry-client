<script lang="ts">
    import { Table, Tbody, Thead, Tr, Th } from "$components/table/index"

    export let _class = ""
    export { _class as class }
</script>

<Table class={_class}>
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

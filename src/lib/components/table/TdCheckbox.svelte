<script lang="ts">
    import Td from "$components/table/Td.svelte"
    import Checkbox from "$components/form/Checkbox.svelte"

    export let checked: boolean
    export let value: string
    export let group: string[]
</script>

<Td class="w-16">
    <Checkbox class="relative z-1 px-6 py-4" bind:checked bind:group {value} />
</Td>

<script lang="ts">
    import Checkbox from "$lib/components/form/Checkbox.svelte"
    import Td from "$lib/components/table/Td.svelte"

    let {
        checked = $bindable(),
        value,
        group = $bindable(),
    }: {
        checked: boolean
        value: string
        group: string[]
    } = $props()
</script>

<Td class="w-16">
    <Checkbox class="relative z-1 px-6 py-4" bind:checked bind:group {value} />
</Td>

<script lang="ts">
    import Checkbox from "@/lib/components/form/Checkbox.svelte"
    import Td from "@/lib/components/table/Td.svelte"

    export let checked: boolean
    export let value: string
    export let group: string[]
</script>

<Td class="w-16">
    <Checkbox class="relative z-1 px-6 py-4" bind:checked bind:group {value} />
</Td>

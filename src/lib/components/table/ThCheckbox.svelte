<script lang="ts">
    import Th from "@/lib/components/table/Th.svelte"
    import Checkbox from "@/lib/components/form/Checkbox.svelte"

    export let checked: boolean
    export let readonly: boolean
</script>

<Th class="!p-0">
    <Checkbox class="px-6 py-3" bind:checked {readonly} on:change />
</Th>

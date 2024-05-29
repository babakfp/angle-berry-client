<script lang="ts">
    import Checkbox from "@/lib/components/form/Checkbox.svelte"
    import Th from "@/lib/components/table/Th.svelte"

    export let checked: boolean
    export let readonly: boolean
</script>

<Th class="!p-0">
    <Checkbox class="px-6 py-3" bind:checked {readonly} on:change />
</Th>

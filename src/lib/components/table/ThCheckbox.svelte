<script lang="ts">
    import type { ChangeEventHandler } from "svelte/elements"
    import Checkbox from "$lib/components/form/Checkbox.svelte"
    import Th from "$lib/components/table/Th.svelte"

    let {
        checked = $bindable(),
        readonly,
        onchange,
    }: {
        checked: boolean
        readonly: boolean
        onchange: ChangeEventHandler<HTMLInputElement>
    } = $props()
</script>

<Th class="p-0!">
    <Checkbox class="px-6 py-3" bind:checked {readonly} {onchange} />
</Th>

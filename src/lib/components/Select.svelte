<script lang="ts">
    import Select from "svelte-select"
    import IconXRegular from "phosphor-icons-svelte/IconXRegular.svelte"
    import IconXCircleRegular from "phosphor-icons-svelte/IconXCircleRegular.svelte"

    export let items: Record<string, string>[]
    export let value: any
    export let multiple = false
    export let placeholder = ""
    export let placeholderAlwaysShow = false
</script>

<Select
    {items}
    {value}
    {multiple}
    on:input
    {placeholder}
    {placeholderAlwaysShow}
    --height="2.75rem"
    --background="rgb(39 39 42)"
    --multi-select-padding="0 .5rem"
    --border-radius="0.375rem"
    --border="2px solid rgb(63 63 70)"
    --border-hover="2px solid rgb(63 63 70)"
    --border-focused="2px solid rgb(63 63 70)"
    --value-container-padding="0.5rem 0"
    --multi-item-bg="rgb(63 63 70)"
    --multi-item-outline="none"
    --multi-item-padding="0 0.5rem 0 0"
    --clear-select-width="32px"
    --clear-select-margin="0 -0.5rem 0 0"
    --list-background="rgb(63 63 70)"
    --item-hover-bg="rgb(82 82 91)"
    --multi-select-input-margin="0"
    --multi-item-gap="0"
>
    <svelte:fragment slot="clear-icon">
        <IconXRegular class="text-lg" />
    </svelte:fragment>
    <svelte:fragment slot="multi-clear-icon">
        <IconXCircleRegular />
    </svelte:fragment>
</Select>

<script lang="ts">
    import Select from "$lib/components/Select.svelte"
    import Label from "./Label.svelte"

    type Option = { value: string; label: string }

    let {
        label,
        options = [],
        selectedOptionValue = $bindable(),
        selectedOption = $bindable(),
        selectedOptions = $bindable([]),
        error = "",
        isMultiple = true,
        readonly,
        name,
        placeholder,
        required,
    }: {
        label: string
        options?: Option[]
        selectedOptionValue?: Option["value"]
        selectedOption?: Option
        selectedOptions?: Option[]
        error?: string
        isMultiple?: boolean
        readonly?: boolean
        name: string
        placeholder: string
        required?: boolean
    } = $props()
</script>

<div>
    <Label {label} {required} />

    <Select
        class="mt-0.5"
        label={placeholder}
        {options}
        bind:selectedOptionValue
        bind:selectedOption
        bind:selectedOptions
        {error}
        {isMultiple}
        {readonly}
    />
</div>

{#if isMultiple}
    {#each selectedOptions as option}
        <input
            class="hidden"
            type="checkbox"
            {name}
            value={option.value}
            checked
        />
    {/each}
{:else}
    <input class="hidden" type="text" {name} value={selectedOptionValue} />
{/if}

<script lang="ts">
    import Select from "@/lib/components/Select.svelte"
    import Label from "./Label.svelte"

    // Start: From "@/lib/components/Select.svelte"
    type Option = { value: string; label: string }

    export let label: string
    export let options: Option[] = []
    export let selectedOptionValue: Option["value"] | undefined = undefined
    export let selectedOption: Option | undefined = undefined
    export let selectedOptions: Option[] = []
    export let error = ""
    export let isMultiple = true
    export let readonly = false
    // End

    export let name: string
    export let placeholder: string
    export let required = false
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

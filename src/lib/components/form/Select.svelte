<script lang="ts">
    import Select from "$components/Select.svelte"
    import Label from "./Label.svelte"

    // Start: From "$components/Select.svelte"
    type Option = { value: string; label: string }

    export let label: string
    export let options: Option[] = []
    export let selectedOptionValue: Option["value"] | undefined = undefined
    export let selectedOption: Option | undefined = undefined
    export let selectedOptions: Option[] = []
    export let error = ""
    export let isMultiple = true
    // End

    export let name: string
    export let placeholder: string
    export let required = false
</script>

<div>
    <Label {label} {required} />

    <Select
        label={placeholder}
        {options}
        bind:selectedOptionValue
        bind:selectedOption
        bind:selectedOptions
        {error}
        {isMultiple}
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

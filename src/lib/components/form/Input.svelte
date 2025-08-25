<script lang="ts">
    import type { Snippet } from "svelte"
    import type { FormEventHandler, FullAutoFill } from "svelte/elements"
    import InputNumberButtons from "$lib/components/form/InputNumberButtons.svelte"
    import InputWrapper from "$lib/components/form/InputWrapper.svelte"

    let {
        label,
        required,
        type = "text",
        name,
        value = $bindable(""),
        placeholder,
        autocomplete,
        minlength,
        maxlength,
        min,
        max,
        readonly,
        pattern,
        class: class_,
        error,
        buttons,
    }: {
        label?: string
        required?: boolean
        type?: string
        name?: string
        value?: string | number
        placeholder?: string
        autocomplete?: FullAutoFill
        minlength?: number
        maxlength?: number
        min?: string | number
        max?: string | number
        readonly?: boolean
        pattern?: string
        class?: string
        error?: string
        buttons?: Snippet
    } = $props()

    const bindValue: FormEventHandler<HTMLInputElement> = (e) => {
        if (["number", "range"].includes(type)) {
            value = +(e.target as HTMLInputElement).value
        } else {
            value = (e.target as HTMLInputElement).value
        }
    }
</script>

{#snippet buttonsInner()}
    {#if type === "number"}
        <InputNumberButtons bind:value {min} {max} />
    {:else if buttons}
        {@render buttons()}
    {/if}
{/snippet}

<InputWrapper {label} {required} for={name} {error}>
    <input
        class={[
            class_,
            "peer block h-11 w-full rounded border-2 border-gray-700 bg-transparent px-4 reset-autofill-input placeholder:text-xs placeholder:text-gray-500",
            { "reset-number-input": type === "number" },
        ]}
        {type}
        {value}
        {name}
        id={name}
        {placeholder}
        {minlength}
        {maxlength}
        {autocomplete}
        {required}
        {readonly}
        {pattern}
        {min}
        {max}
        oninput={bindValue}
    />

    {#snippet buttons()}
        {@render buttonsInner()}
    {/snippet}
</InputWrapper>

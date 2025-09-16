<script lang="ts">
    import type { Snippet } from "svelte"
    import type { HTMLInputAttributes } from "svelte/elements"
    import InputNumberButtons from "$lib/components/form/InputNumberButtons.svelte"
    import InputWrapper from "$lib/components/form/InputWrapper.svelte"
    import InputNative from "./InputNative.svelte"

    let {
        label,
        value = $bindable(""),
        error,
        buttons,
        ...rest
    }: HTMLInputAttributes & {
        label?: string
        value?: string | number
        error?: string
        buttons?: Snippet
    } = $props()
</script>

{#snippet buttonsInner()}
    {#if rest.type === "number"}
        <InputNumberButtons bind:value min={Number(rest.min)} max={Number()} />
    {:else if buttons}
        {@render buttons()}
    {/if}
{/snippet}

<InputWrapper
    {label}
    required={Boolean(rest.required)}
    for={String(rest.name)}
    {error}
>
    <InputNative {...rest} bind:value />

    {#snippet buttons()}
        {@render buttonsInner()}
    {/snippet}
</InputWrapper>

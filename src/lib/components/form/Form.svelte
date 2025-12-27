<script lang="ts" generics="Input extends RemoteFormInput | void, Output">
    import type { RemoteFormInput } from "@sveltejs/kit"
    import IconSpinnerRegular from "phosphor-icons-svelte/IconSpinnerRegular.svelte"
    import { navigating } from "$app/state"
    import Description from "$lib/components/form/Description.svelte"
    import FormBase, {
        type FormBaseProps,
    } from "$lib/components/form/FormBase.svelte"
    import FormSubmitButton from "$lib/components/form/FormSubmitButton.svelte"

    let {
        message = $bindable(),
        submitButtonText,
        submitButtonClass,
        children,
        ...rest
    }: {
        message?: string
        submitButtonText: string
        submitButtonClass?: string
    } & FormBaseProps<Input, Output> = $props()

    const isPending = $derived(rest.form.pending > 0)
    const isNavigating = $derived(!!navigating.complete)
</script>

<FormBase
    class={[
        "grid gap-4",
        rest.class,
        { "pointer-events-none": isPending || isNavigating },
    ]}
    {...rest}
>
    {@render children()}

    <FormSubmitButton
        class={submitButtonClass}
        disabled={isPending || isNavigating}
    >
        <span>
            {isPending ? "Pending"
            : isNavigating ? "Navigating"
            : submitButtonText}
        </span>
        {#if isPending || isNavigating}
            <IconSpinnerRegular class="animate-spin text-2xl" />
        {/if}
    </FormSubmitButton>

    {#if message}
        {#if isNavigating}
            <Description type="success">{message}</Description>
        {:else}
            <Description type="error">{message}</Description>
        {/if}
    {/if}
</FormBase>

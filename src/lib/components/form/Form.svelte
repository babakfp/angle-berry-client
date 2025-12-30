<script lang="ts" generics="Input extends RemoteFormInput | void, Output">
    import type { RemoteFormInput } from "@sveltejs/kit"
    import IconSpinnerRegular from "phosphor-icons-svelte/IconSpinnerRegular.svelte"
    import type { Snippet } from "svelte"
    import type { ClassValue } from "svelte/elements"
    import Description from "$lib/components/form/Description.svelte"
    import FormBase, {
        type FormBaseProps,
    } from "$lib/components/form/FormBase.svelte"
    import FormSubmitButton from "$lib/components/form/FormSubmitButton.svelte"

    let {
        class: class_,
        message = $bindable(),
        isRedirecting,
        submitButtonText,
        submitButtonClass,
        children,
        ...rest
    }: Omit<FormBaseProps<Input, Output>, "children"> & {
        message?: string
        isRedirecting?: boolean
        submitButtonText: string
        submitButtonClass?: ClassValue
        children?: Snippet
    } = $props()

    const isPending = $derived(rest.form.pending > 0)
</script>

<FormBase
    class={[
        "grid gap-4",
        class_,
        { "pointer-events-none": isPending || isRedirecting },
    ]}
    {...rest}
>
    {@render children?.()}

    <FormSubmitButton
        class={submitButtonClass}
        disabled={isPending || isRedirecting}
    >
        <span>
            <!-- TODO: pending is not good text to show -->
            {isPending ? "Pending"
            : isRedirecting ? "Redirecting"
            : submitButtonText}
        </span>
        {#if isPending || isRedirecting}
            <IconSpinnerRegular class="animate-spin text-2xl" />
        {/if}
    </FormSubmitButton>

    <Description type={isRedirecting ? "success" : "error"}>
        {message}
    </Description>
</FormBase>

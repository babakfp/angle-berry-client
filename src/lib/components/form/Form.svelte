<script
    lang="ts"
    generics="Success extends Record<string, unknown> | undefined, Failure extends Record<string, unknown> | undefined"
>
    import IconSpinnerRegular from "phosphor-icons-svelte/IconSpinnerRegular.svelte"
    import toast from "svelte-hot-french-toast"
    import type { ClassValue } from "svelte/elements"
    import Description from "$lib/components/form/Description.svelte"
    import FormBase, {
        type FormBaseProps,
    } from "$lib/components/form/FormBase.svelte"
    import FormSubmitButton from "$lib/components/form/FormSubmitButton.svelte"

    let {
        message = $bindable(),
        submitButtonText,
        submitButtonClass,
        errors,
        validateForm,
        action,
        allowUpload,
        class: class_,
        children,
        onError,
        onRedirect,
        onSuccess,
    }: {
        message?: string
        submitButtonText: string
        submitButtonClass?: ClassValue
    } & Omit<
        FormBaseProps<Success, Failure>,
        "onSubmit" | "onInvalid" | "onReturn"
    > = $props()

    let isSubmitting = $state(false)
    let isRedirecting = $state(false)
</script>

<FormBase
    class={[
        "grid gap-4",
        class_,
        { "pointer-events-none": isSubmitting || isRedirecting },
    ]}
    {action}
    {allowUpload}
    {errors}
    {validateForm}
    onSubmit={() => {
        isSubmitting = true
        message = ""
    }}
    onInvalid={() => {
        isSubmitting = false
        message = ""
    }}
    onReturn={() => {
        isSubmitting = false
    }}
    onRedirect={() => {
        onRedirect?.()
        isRedirecting = true
    }}
    {onError}
    {onSuccess}
    onFailure={(result) => {
        const message = String(result.data?.message)
        if (!message) return
        toast.error(message)
    }}
>
    {@render children?.()}

    <FormSubmitButton
        class={submitButtonClass}
        disabled={isSubmitting || isRedirecting}
    >
        <span>
            {isSubmitting ? "Submitting"
            : isRedirecting ? "Redirecting"
            : submitButtonText}
        </span>
        {#if isSubmitting || isRedirecting}
            <IconSpinnerRegular class="animate-spin text-2xl" />
        {/if}
    </FormSubmitButton>

    {#if $errors?._errors?.length}
        {#if $errors?._errors?.length > 1}
            <ul class="list-inside list-disc">
                {#each $errors?._errors as error}
                    <li class="text-xs text-red-400">
                        {error}
                    </li>
                {/each}
            </ul>
        {:else}
            <p class="text-xs text-red-400">
                {$errors?._errors[0]}
            </p>
        {/if}
    {/if}

    {#if message}
        {#if isRedirecting}
            <Description type="success">{message}</Description>
        {:else}
            <Description type="error">{message}</Description>
        {/if}
    {/if}
</FormBase>

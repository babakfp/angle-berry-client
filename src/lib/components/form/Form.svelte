<script lang="ts">
    import IconSpinnerRegular from "phosphor-icons-svelte/IconSpinnerRegular.svelte"
    import { createEventDispatcher, type Snippet } from "svelte"
    import toast from "svelte-hot-french-toast"
    import type { SuperForm } from "sveltekit-superforms/client"
    import Description from "$lib/components/form/Description.svelte"
    import FormBase from "$lib/components/form/FormBase.svelte"
    import FormSubmitButton from "$lib/components/form/FormSubmitButton.svelte"

    const dispatch = createEventDispatcher()

    let {
        message = $bindable(),
        submitButtonText,
        submitButtonClass,
        errors,
        validateForm,
        action,
        canUpload,
        class: class_,
        children,
    }: {
        message: string
        submitButtonText: string
        submitButtonClass?: string
        errors?: SuperForm<Record<string, unknown>>["errors"]
        validateForm?: SuperForm<Record<string, unknown>>["validateForm"]
        action?: string
        canUpload?: boolean
        class?: string
        children?: Snippet
    } = $props()

    let isSubmitting = $state(false)
    let isRedirecting = $state(false)

    const handleOnSubmit = () => {
        isSubmitting = true
        message = ""
    }
    const handleOnInvalid = () => {
        isSubmitting = false
        message = ""
    }
    const handleOnReturn = () => {
        isSubmitting = false
    }
    const handleOnRedirect = () => {
        dispatch("redirect")
        isRedirecting = true
    }
</script>

<FormBase
    class={[
        "grid gap-4",
        class_,
        { "pointer-events-none": isSubmitting || isRedirecting },
    ]}
    {action}
    {canUpload}
    {errors}
    {validateForm}
    on:submit={handleOnSubmit}
    on:invalid={handleOnInvalid}
    on:return={handleOnReturn}
    on:redirect={handleOnRedirect}
    on:error
    on:success
    on:failure={(e) => {
        toast.error(e.detail.message, {
            position: "bottom-end",
        })
    }}
>
    {@render children?.()}

    <FormSubmitButton
        class={submitButtonClass}
        disabled={isSubmitting || isRedirecting}
    >
        <span>{isRedirecting ? "Redirecting" : submitButtonText}</span>
        {#if isSubmitting || isRedirecting}
            <IconSpinnerRegular class="ml-2 animate-spin text-2xl" />
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
            <Description type="success" text={message} />
        {:else}
            <Description type="error" text={message} />
        {/if}
    {/if}
</FormBase>

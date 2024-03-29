<script lang="ts">
    import FormSubmitButton from "$components/form/FormSubmitButton.svelte"
    import IconSpinnerRegular from "phosphor-icons-svelte/IconSpinnerRegular.svelte"
    import Description from "$components/form/Description.svelte"
    import { createEventDispatcher } from "svelte"
    import type { SuperForm } from "sveltekit-superforms/client"
    import FormBase from "$components/form/FormBase.svelte"

    const dispatch = createEventDispatcher()

    export let message: string
    export let submitButtonText: string
    export let submitButtonClass = ""
    export let errors:
        | SuperForm<Record<string, unknown>>["errors"]
        | undefined = undefined
    export let validateForm:
        | SuperForm<Record<string, unknown>>["validateForm"]
        | undefined = undefined
    export let action = ""
    export let canUpload = false
    export let _class = ""
    export { _class as class }

    let isSubmitting = false
    let isRedirecting = false

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
    class="grid gap-4 {_class} {(isSubmitting || isRedirecting) &&
        'pointer-events-none'}"
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
    on:failure
>
    <slot />

    <FormSubmitButton
        class={submitButtonClass}
        disabled={isSubmitting || isRedirecting}
    >
        <span>{isRedirecting ? "Redirecting" : submitButtonText}</span>
        {#if isSubmitting || isRedirecting}
            <IconSpinnerRegular class="ml-2 animate-spin text-2xl" />
        {/if}
    </FormSubmitButton>

    {#if message}
        {#if isRedirecting}
            <Description type="success" text={message} />
        {:else}
            <Description type="error" text={message} />
        {/if}
    {/if}
</FormBase>

<script lang="ts">
    import type { SubmitFunction } from "@sveltejs/kit"
    import { enhance } from "$app/forms"
    import FormSubmitButton from "$components/form/FormSubmitButton.svelte"
    import IconSpinnerRegular from "phosphor-icons-svelte/IconSpinnerRegular.svelte"
    import Description from "$components/form/Description.svelte"
    import { createEventDispatcher } from "svelte"
    import type { SuperForm } from "sveltekit-superforms/client"

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
    export let successMessage = ""
    export let action = ""
    export let doesUpload = false
    export let _class = ""
    export { _class as class }

    let isSubmitting = false
    let isRedirecting = false

    const handleFormSubmit: SubmitFunction = async ({ cancel }) => {
        isSubmitting = true
        message = ""

        if (validateForm && errors) {
            const validation = await validateForm()

            if (!validation.valid) {
                cancel()
                errors.set(validation.errors)
                isSubmitting = false
                message = ""
            }
        }

        return async ({ result, update }) => {
            dispatch(result.type)

            isSubmitting = false

            if (result.type === "redirect") {
                isRedirecting = true
                message = successMessage
            }

            update()
        }
    }
</script>

<form
    class="grid gap-4 {_class}"
    class:pointer-events-none={isSubmitting || isRedirecting}
    method="post"
    use:enhance={handleFormSubmit}
    novalidate
    {action}
    enctype={doesUpload ? "multipart/form-data" : undefined}
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
</form>

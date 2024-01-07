<script lang="ts">
    import type { SubmitFunction } from "@sveltejs/kit"
    import { enhance } from "$app/forms"
    import FormSubmitButton from "$components/form/FormSubmitButton.svelte"
    import IconSpinnerRegular from "phosphor-icons-svelte/IconSpinnerRegular.svelte"
    import Description from "$components/form/Description.svelte"

    export let message: string
    export let submitButtonText: string
    export let submitButtonClass = ""
    export let errors: any = undefined
    export let validate: any = undefined
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

        if (validate !== undefined && errors !== undefined) {
            const validation = await validate()

            if (!validation.valid) {
                cancel()
                errors.set(validation.errors)
                isSubmitting = false
                message = ""
            }
        }

        return async ({ result, update }) => {
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

    <FormSubmitButton class={submitButtonClass} disabled={isSubmitting}>
        {#if isSubmitting}
            <IconSpinnerRegular class="text-2xl" />
        {:else if isRedirecting}
            Redirecting...
        {:else}
            {submitButtonText}
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

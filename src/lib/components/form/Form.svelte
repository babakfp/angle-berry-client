<script lang="ts">
    import { enhance } from "$app/forms"
    import FormSubmitButton from "$components/form/FormSubmitButton.svelte"
    import IconLoading from "$icons/IconLoading.svelte"
    import Description from "$components/form/Description.svelte"

    export let message: string
    export let submitButtonText: string
    export let errors: any
    export let validate: any
    export let successMessage = ""

    let isSubmitting = false
    let isRedirecting = false

    async function handleFormSubmit({ cancel }: { cancel: any }) {
        isSubmitting = true

        const submitionResult = await validate()

        if (!submitionResult.valid) {
            cancel()
            $errors = submitionResult.errors
            isSubmitting = false
            message = ""
        }

        return async ({ result, update }: { result: any; update: any }) => {
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
    class="grid gap-4"
    class:pointer-events-none={isSubmitting || isRedirecting}
    method="post"
    use:enhance={handleFormSubmit}
    novalidate
>
    <slot />

    <FormSubmitButton disabled={isSubmitting}>
        {#if isSubmitting}
            <IconLoading class="text-2xl" />
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

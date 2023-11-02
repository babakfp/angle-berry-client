<script lang="ts">
    import { enhance } from "$app/forms"
    import FormSubmitButton from "$components/form/FormSubmitButton.svelte"
    import IconLoading from "$icons/IconLoading.svelte"
    import Error from "./Error.svelte"

    export let message
    export let method: "post"
    export let submitButtonText: string
    export let errors
    export let validate

    let isSubmitting = false
    let isRedirecting = false

    async function handleFormSubmit({ cancel }) {
        isSubmitting = true

        const submitionResult = await validate()

        if (!submitionResult.valid) {
            cancel()
            $errors = submitionResult.errors
            isSubmitting = false
        }

        return async ({ result, update }) => {
            isSubmitting = false
            if (result.type === "redirect") {
                isRedirecting = true
            }
            update()
        }
    }
</script>

<form
    class="grid gap-4"
    class:pointer-events-none={isSubmitting || isRedirecting}
    {method}
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

    <Error {message} />
</form>

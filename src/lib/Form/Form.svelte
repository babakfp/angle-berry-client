<script>
    import { enhance } from "$app/forms"
    import FormSubmitButton from "$lib/Form/FormSubmitButton.svelte"
    import IconLoading from "$icons/IconLoading.svelte"
    import Error from "./Error.svelte"

    export let message
    export let method
    export let isSubmitting
    export let submitButtonText
    export let handleFormSubmit
</script>

<form
    class="grid gap-4 {isSubmitting && 'pointer-events-none'}"
    {method}
    use:enhance={handleFormSubmit}
>
    <slot />

    <FormSubmitButton disabled={isSubmitting}>
        {#if isSubmitting}
            <IconLoading class="text-2xl" />
        {:else}
            {submitButtonText}
        {/if}
    </FormSubmitButton>

    <Error {message} />
</form>

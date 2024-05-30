<script lang="ts">
    import IconSpinnerRegular from "phosphor-icons-svelte/IconSpinnerRegular.svelte"
    import { createEventDispatcher } from "svelte"
    import toast from "svelte-french-toast"
    import type { SuperForm } from "sveltekit-superforms/client"
    import Description from "@/components/form/Description.svelte"
    import FormBase from "@/components/form/FormBase.svelte"
    import FormSubmitButton from "@/components/form/FormSubmitButton.svelte"

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
    export let class_ = ""
    export { class_ as class }

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
    class="grid gap-4 {class_} {(isSubmitting || isRedirecting) &&
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
    on:failure={(e) => {
        toast.error(e.detail.message, {
            position: "bottom-right",
        })
    }}
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

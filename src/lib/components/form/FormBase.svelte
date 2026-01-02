<script module lang="ts">
    export type FormBaseProps<
        Success extends Record<string, unknown> | undefined,
        Failure extends Record<string, unknown> | undefined,
    > = {
        errors?: SuperForm<Record<string, unknown>>["errors"]
        validateForm?: SuperForm<Record<string, unknown>>["validateForm"]
        action?: string
        allowUpload?: boolean
        class?: ClassValue
        children?: Snippet
        onSubmit?: () => void
        onInvalid?: () => void
        onReturn?: () => void
        onError?: () => void
        onFailure?: (result: {
            type: "failure"
            status: number
            data?: Failure
        }) => void
        onRedirect?: () => void
        onSuccess?: () => void
    }
</script>

<script
    lang="ts"
    generics="Success extends Record<string, unknown> | undefined, Failure extends Record<string, unknown> | undefined"
>
    import type { SubmitFunction } from "@sveltejs/kit"
    import { type Snippet } from "svelte"
    import type { ClassValue } from "svelte/elements"
    import type { SuperForm } from "sveltekit-superforms/client"
    import { enhance } from "$app/forms"

    let {
        errors,
        validateForm,
        action,
        allowUpload,
        class: class_,
        children,
        onSubmit,
        onInvalid,
        onReturn,
        onError,
        onFailure,
        onRedirect,
        onSuccess,
    }: FormBaseProps<Success, Failure> = $props()

    const handleFormSubmit: SubmitFunction = async ({ cancel }) => {
        onSubmit?.()

        if (validateForm && errors) {
            const validation = await validateForm()

            if (!validation.valid) {
                onInvalid?.()
                cancel()
                errors.set(validation.errors)
            }
        }

        return async ({ result, update }) => {
            onReturn?.()
            if (result.type === "error") {
                onError?.()
            } else if (result.type === "failure") {
                // @ts-expect-error goh nakhor
                onFailure?.(result)
            } else if (result.type === "redirect") {
                onRedirect?.()
            } else if (result.type === "success") {
                onSuccess?.()
            }
            update()
        }
    }
</script>

<form
    class={class_}
    method="post"
    use:enhance={handleFormSubmit}
    novalidate
    {action}
    enctype={allowUpload ? "multipart/form-data" : undefined}
>
    {@render children?.()}
</form>

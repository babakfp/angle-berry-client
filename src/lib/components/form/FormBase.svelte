<script lang="ts">
    import type { SubmitFunction } from "@sveltejs/kit"
    import { createEventDispatcher, type Snippet } from "svelte"
    import type { ClassValue } from "svelte/elements"
    import type { SuperForm } from "sveltekit-superforms/client"
    import { enhance } from "$app/forms"

    const dispatch = createEventDispatcher()

    let {
        errors,
        validateForm,
        action,
        canUpload,
        class: class_,
        children,
    }: {
        errors?: SuperForm<Record<string, unknown>>["errors"]
        validateForm?: SuperForm<Record<string, unknown>>["validateForm"]
        action?: string
        canUpload?: boolean
        class?: ClassValue
        children?: Snippet
    } = $props()

    const handleFormSubmit: SubmitFunction = async ({ cancel }) => {
        dispatch("submit")

        if (validateForm && errors) {
            const validation = await validateForm()

            if (!validation.valid) {
                dispatch("invalid")
                cancel()
                errors.set(validation.errors)
            }
        }

        return async ({ result, update }) => {
            dispatch("return")
            dispatch(result.type, result)
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
    enctype={canUpload ? "multipart/form-data" : undefined}
>
    {@render children?.()}
</form>

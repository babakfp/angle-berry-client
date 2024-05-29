<script lang="ts">
    import type { SubmitFunction } from "@sveltejs/kit"
    import { createEventDispatcher } from "svelte"
    import type { SuperForm } from "sveltekit-superforms/client"
    import { enhance } from "$app/forms"

    const dispatch = createEventDispatcher()

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
    <slot />
</form>

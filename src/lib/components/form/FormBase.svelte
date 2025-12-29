<script module lang="ts">
    import type { RemoteForm, RemoteFormInput } from "@sveltejs/kit"
    import type { Snippet } from "svelte"
    import type { HTMLFormAttributes } from "svelte/elements"

    export type FormBaseProps<
        Input extends RemoteFormInput | void,
        Output,
    > = Omit<HTMLFormAttributes, "novalidate" | "enctype"> & {
        allowUpload?: boolean
        children: Snippet

        form: RemoteForm<Input, Output>
        enhance: Parameters<RemoteForm<Input, Output>["enhance"]>["0"]

        ref?: HTMLFormElement
    }

    // TODO
</script>

<script lang="ts" generics="Input extends RemoteFormInput | void, Output">
    let {
        allowUpload,
        children,

        form,
        enhance,

        ref = $bindable(),

        ...rest
    }: FormBaseProps<Input, Output> = $props()
</script>

<form
    novalidate
    enctype={allowUpload ? "multipart/form-data" : undefined}
    {...rest}
    {...form.enhance(enhance)}
    bind:this={ref}
>
    {@render children()}
</form>

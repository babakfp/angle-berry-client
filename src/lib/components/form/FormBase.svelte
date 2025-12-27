<script module lang="ts">
    import type { RemoteForm, RemoteFormInput } from "@sveltejs/kit"
    import type { Snippet } from "svelte"
    import type { HTMLFormAttributes } from "svelte/elements"

    export type FormBaseProps<
        Input extends RemoteFormInput | void,
        Output,
    > = RemoteForm<Input, Output>
        & Omit<HTMLFormAttributes, "novalidate" | "enctype"> & {
            allowUpload?: boolean
            children?: Snippet // TODO: maybe doesn't need to be optional
        }

    // TODO
</script>

<script lang="ts" generics="Input extends RemoteFormInput | void, Output">
    let { allowUpload, children, ...rest }: FormBaseProps<Input, Output> =
        $props()
</script>

<form
    novalidate
    enctype={allowUpload ? "multipart/form-data" : undefined}
    {...rest}
>
    {@render children?.()}
</form>

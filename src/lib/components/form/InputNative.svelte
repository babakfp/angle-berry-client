<script module lang="ts">
    export type InputNativeProps = HTMLInputAttributes & {
        value?: string | number
    }
</script>

<script lang="ts">
    import type { FormEventHandler, HTMLInputAttributes } from "svelte/elements"

    let {
        class: class_,
        type = "text",
        value = $bindable(""),
        ...rest
    }: InputNativeProps = $props()

    const bindValue: FormEventHandler<HTMLInputElement> = (e) => {
        if (type === "number" || type === "range") {
            value = +(e.target as HTMLInputElement).value
        } else {
            value = (e.target as HTMLInputElement).value
        }
        rest.oninput?.(e)
    }
</script>

<input
    {...rest}
    class={[
        class_,
        "peer reset-autofill-input block h-11 w-full rounded border-2 border-gray-700 bg-transparent px-4 placeholder:text-xs placeholder:text-gray-500",
        { "reset-number-input": type === "number" },
    ]}
    {type}
    bind:value
    id={rest.name}
    oninput={bindValue}
/>

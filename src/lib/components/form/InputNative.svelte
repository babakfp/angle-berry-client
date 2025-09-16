<script lang="ts">
    import type { FormEventHandler, HTMLInputAttributes } from "svelte/elements"

    let {
        type = "text",
        value = $bindable(""),
        ...rest
    }: HTMLInputAttributes & {
        value?: string | number
    } = $props()

    const bindValue: FormEventHandler<HTMLInputElement> = (e) => {
        if (type === "number" || type === "range") {
            value = +(e.target as HTMLInputElement).value
        } else {
            value = (e.target as HTMLInputElement).value
        }
    }
</script>

<input
    class={[
        rest.class,
        "peer reset-autofill-input block h-11 w-full rounded border-2 border-gray-700 bg-transparent px-4 placeholder:text-xs placeholder:text-gray-500",
        { "reset-number-input": type === "number" },
    ]}
    {...rest}
    id={rest.name}
    oninput={bindValue}
/>

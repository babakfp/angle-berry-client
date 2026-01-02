<script lang="ts">
    import type { Snippet } from "svelte"
    import type { ClassValue } from "svelte/elements"

    let {
        class: class_,
        type,
        children,
    }: {
        class?: ClassValue
        type: "error" | "success"
        children: Snippet
    } = $props()
</script>

<p
    class={[
        class_,
        "text-xs",
        {
            "text-red-400": type === "error",
            "text-green-400": type === "success",
        },
    ]}
>
    {@render children()}
</p>

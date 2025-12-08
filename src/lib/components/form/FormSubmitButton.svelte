<script lang="ts">
    import type { Snippet } from "svelte"
    import type { ClassValue } from "svelte/elements"

    let {
        disabled,
        class: class_,
        children,
    }: {
        disabled?: boolean
        class?: ClassValue
        children?: Snippet
    } = $props()
</script>

<button
    type="submit"
    class={[
        class_,
        "btn btn-brand h-14 w-full will-change-transform active:translate-y-px",
    ]}
    {disabled}
>
    {@render children?.()}
</button>

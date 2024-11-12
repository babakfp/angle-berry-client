<script lang="ts">
    import type { Snippet } from "svelte"

    let {
        disabled,
        class: class_,
        children,
    }: {
        disabled?: boolean
        class?: string
        children?: Snippet
    } = $props()
</script>

<button
    type="submit"
    class="{class_ ||
        'btn-brand'} btn h-14 w-full will-change-transform active:scale-95"
    {disabled}
>
    {@render children?.()}
</button>

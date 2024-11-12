<script lang="ts">
    import type { Snippet } from "svelte"

    let {
        class: class_,
        children,
    }: {
        class?: string
        children?: Snippet
    } = $props()
</script>

<div class="{class_} group relative inline-block">
    {@render children?.()}
</div>

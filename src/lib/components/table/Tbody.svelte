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

<tbody class={class_}>
    {@render children?.()}
</tbody>

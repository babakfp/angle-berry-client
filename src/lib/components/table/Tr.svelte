<script lang="ts">
    import type { Snippet } from "svelte"
    import type { ClassValue } from "svelte/elements"

    let {
        class: class_,
        children,
    }: {
        class?: ClassValue
        children: Snippet
    } = $props()
</script>

<tr class={class_}>
    {@render children()}
</tr>

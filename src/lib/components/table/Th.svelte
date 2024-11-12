<script lang="ts">
    import type { Snippet } from "svelte"

    let {
        class: class_,
        containsAnchor,
        children,
    }: {
        class?: string
        containsAnchor?: boolean
        children: Snippet
    } = $props()
</script>

<th class="{class_} p-0 {!containsAnchor ? 'px-6' : ''}">
    {@render children()}
</th>

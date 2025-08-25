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

<th class={[class_, "p-0", { "px-6": !containsAnchor }]}>
    {@render children()}
</th>

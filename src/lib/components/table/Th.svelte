<script lang="ts">
    import type { Snippet } from "svelte"
    import type { ClassValue } from "svelte/elements"

    let {
        class: class_,
        containsAnchor,
        children,
    }: {
        class?: ClassValue
        containsAnchor?: boolean
        children: Snippet
    } = $props()
</script>

<th class={[class_, "p-0", { "px-6": !containsAnchor }]}>
    {@render children()}
</th>

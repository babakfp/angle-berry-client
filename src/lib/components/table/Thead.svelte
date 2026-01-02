<script lang="ts">
    import type { Snippet } from "svelte"
    import type { ClassValue } from "svelte/elements"

    let {
        class: class_,
        children,
    }: {
        class?: ClassValue
        children?: Snippet
    } = $props()
</script>

<thead class={[class_, "border-b border-gray-50/5 text-xs uppercase"]}>
    {@render children?.()}
</thead>

<style>
    @reference "../../app.css";

    thead :global(th) {
        @apply py-3 pt-3.5;
    }
</style>

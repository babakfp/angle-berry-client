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

<thead class={[class_, "border-b border-gray-50/5 text-xs uppercase"]}>
    {@render children?.()}
</thead>

<style lang="postcss">
    thead :global(th) {
        @apply py-3 pt-3.5;
    }
</style>

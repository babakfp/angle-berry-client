<script lang="ts">
    import type { Snippet } from "svelte"

    let {
        children,
    }: {
        children: Snippet
    } = $props()
</script>

<div
    class="text-2xs absolute top-4 right-2 flex h-3.5 min-w-3.5 items-center rounded-full bg-gray-600 px-1"
>
    {@render children()}
</div>

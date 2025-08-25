<script lang="ts">
    import type { Snippet } from "svelte"
    import AnimatePageNavigation from "$lib/components/AnimatePageNavigation.svelte"

    let {
        children,
    }: {
        children: Snippet
    } = $props()
</script>

<AnimatePageNavigation
    class="container min-h-screen max-w-sm! content-center py-12"
>
    {@render children()}
</AnimatePageNavigation>

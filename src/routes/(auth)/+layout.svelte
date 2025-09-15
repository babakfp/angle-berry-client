<script lang="ts">
    import type { Snippet } from "svelte"
    import AnimatePageNavigation from "$lib/components/AnimatePageNavigation.svelte"

    let {
        children,
    }: {
        children: Snippet
    } = $props()
</script>

<div class="container">
    <AnimatePageNavigation
        class="mx-auto min-h-screen max-w-sm content-center py-12"
    >
        {@render children()}
    </AnimatePageNavigation>
</div>

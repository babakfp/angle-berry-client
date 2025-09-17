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
        class="mx-auto min-h-dvh max-w-sm content-center pt-8 pb-32"
    >
        {@render children()}
    </AnimatePageNavigation>
</div>

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
    class="mx-auto min-h-screen max-w-sm content-center px-4 py-12"
>
    {@render children()}
</AnimatePageNavigation>

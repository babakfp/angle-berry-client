<script lang="ts">
    import AnimatePageNavigation from "@/lib/components/AnimatePageNavigation.svelte"
</script>

<AnimatePageNavigation
    class="mx-auto grid min-h-screen w-full max-w-xs content-center items-center py-12"
>
    <slot />
</AnimatePageNavigation>

<script lang="ts">
    import { fly } from "svelte/transition"
    import { page } from "$app/stores"
    import { pageTransitionValues } from "$utilities/pageTransitionValues"
</script>

{#key $page.url.pathname}
    <div
        class="mx-auto grid min-h-screen w-full max-w-xs content-center items-center py-12"
        in:fly={pageTransitionValues}
    >
        <slot />
    </div>
{/key}

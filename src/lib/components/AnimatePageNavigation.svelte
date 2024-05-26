<script lang="ts">
    import { fly } from "svelte/transition"
    import { page } from "$app/stores"

    export let tag: string = "div"
</script>

{#key $page.url.pathname}
    <svelte:element
        this={tag}
        {...$$restProps}
        in:fly={{ y: 32, duration: 1000, delay: 100 }}
    >
        <slot />
    </svelte:element>
{/key}

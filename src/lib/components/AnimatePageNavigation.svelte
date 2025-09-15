<script lang="ts">
    import type { Snippet } from "svelte"
    import { fly } from "svelte/transition"
    import { page } from "$app/state"

    let {
        tag = "div",
        children,
        ...rest
    }: {
        tag?: string
        children?: Snippet
        [key: string]: any
    } = $props()
</script>

{#key page.url.pathname}
    <svelte:element
        this={tag}
        {...rest}
        in:fly={{ y: 32, duration: 1000, delay: 100 }}
    >
        {@render children?.()}
    </svelte:element>
{/key}

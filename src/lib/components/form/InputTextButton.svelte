<script lang="ts">
    import type { Snippet } from "svelte"
    import type { MouseEventHandler } from "svelte/elements"

    let {
        class: class_,
        text,
        children,
        onclick,
    }: {
        class?: string
        text?: string
        children?: Snippet
        onclick: MouseEventHandler<HTMLButtonElement>
    } = $props()
</script>

<button
    type="button"
    class={["btn btn-gray-light h-7 text-2xs", class_]}
    {onclick}
>
    {#if children}
        {@render children?.()}
    {:else}
        {text}
    {/if}
</button>

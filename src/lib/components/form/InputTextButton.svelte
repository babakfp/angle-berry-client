<script lang="ts">
    import type { Snippet } from "svelte"
    import type { ClassValue, MouseEventHandler } from "svelte/elements"

    let {
        class: class_,
        text,
        children,
        onclick,
    }: {
        class?: ClassValue
        text?: string
        children?: Snippet
        onclick: MouseEventHandler<HTMLButtonElement>
    } = $props()
</script>

<button
    type="button"
    class={["btn btn-gray-light text-2xs h-7", class_]}
    {onclick}
>
    {#if children}
        {@render children?.()}
    {:else}
        {text}
    {/if}
</button>

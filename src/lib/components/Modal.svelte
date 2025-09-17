<script lang="ts">
    import type { Snippet } from "svelte"

    let {
        title,
        description,
        isOpen = $bindable(),
        isFullSize,
        children,
        actions,
    }: {
        title?: string
        description?: string
        isOpen?: boolean
        isFullSize?: boolean
        children?: Snippet
        actions?: Snippet
    } = $props()
</script>

<svelte:window
    onkeydown={(e) => {
        if (e.key === "Escape") {
            isOpen = false
        }
    }}
/>

<div
    class={[
        "bg-background/50 fixed inset-0 z-50 flex h-dvh w-dvw items-center justify-center",
        isFullSize ? "p-0 sm:p-8" : "p-8",
        { hidden: !isOpen },
    ]}
    onclick={(e) => {
        if (e.target === e.currentTarget) {
            isOpen = false
        }
    }}
>
    <div
        class="grid gap-6 overflow-y-auto overscroll-y-contain bg-gray-700 drop-shadow
                {isFullSize ? 'h-full w-full sm:rounded' : 'max-w-md rounded'}"
    >
        <div class="grid gap-4 p-6 pb-0">
            {#if title}
                <h6 class="text-lg">{title}</h6>
            {/if}
            {#if description}
                <p>{description}</p>
            {/if}

            {@render children?.()}
        </div>

        <div
            class="sticky bottom-0 flex justify-end gap-2 self-end border-t border-gray-600 bg-gray-700 px-6 py-4"
        >
            {@render actions?.()}
        </div>
    </div>
</div>

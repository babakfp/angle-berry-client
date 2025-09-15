<script lang="ts">
    import type { Snippet } from "svelte"
    import type { MouseEventHandler } from "svelte/elements"
    import {
        contextMenuTargetEvent,
        isContextMenuOpen,
    } from "./chatStores.svelte"

    let {
        children,
        oncontextmenu,
    }: {
        children?: Snippet
        oncontextmenu: MouseEventHandler<HTMLDivElement>
    } = $props()

    let contextMenu = $state<HTMLDivElement>()

    $effect(() => {
        if (contextMenu && isContextMenuOpen.state) {
            let x = contextMenuTargetEvent.state!.clientX + 14
            let y = contextMenuTargetEvent.state!.clientY

            if (
                contextMenuTargetEvent.state!.clientX
                    + contextMenu.offsetWidth
                    + 26
                > window.innerWidth
            ) {
                x -= contextMenu.offsetWidth + 26
            }
            if (
                contextMenuTargetEvent.state!.clientY
                    + contextMenu.offsetHeight
                    + 20
                > window.innerHeight
            ) {
                y -= contextMenu.offsetHeight
                contextMenu.style.transform = "translateY(20px)"
            }

            contextMenu.style.left = `${x}px`
            contextMenu.style.top = `${y}px`
        }
    })
</script>

{#if isContextMenuOpen.state}
    <div
        bind:this={contextMenu}
        class="absolute z-50 -translate-y-5"
        oncontextmenu={(e) => {
            e.preventDefault()
            oncontextmenu(e)
        }}
    >
        <ul
            class="max-h-56 max-w-48 min-w-36 overflow-y-auto overscroll-y-contain rounded bg-gray-600 p-1 text-xs shadow"
        >
            {@render children?.()}
        </ul>
    </div>
{/if}

<script lang="ts">
    import type { Snippet } from "svelte"
    import type { MouseEventHandler } from "svelte/elements"
    import { contextMenuTargetEvent, isContextMenuOpen } from "./chatStores"

    let {
        children,
        oncontextmenu,
    }: {
        children?: Snippet
        oncontextmenu: MouseEventHandler<HTMLDivElement>
    } = $props()

    let contextMenu = $state<HTMLDivElement>()

    $effect(() => {
        if (contextMenu && $isContextMenuOpen) {
            let x = $contextMenuTargetEvent!.clientX + 14
            let y = $contextMenuTargetEvent!.clientY

            if (
                $contextMenuTargetEvent!.clientX + contextMenu.offsetWidth + 26
                > window.innerWidth
            ) {
                x -= contextMenu.offsetWidth + 26
            }
            if (
                $contextMenuTargetEvent!.clientY + contextMenu.offsetHeight + 20
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

{#if $isContextMenuOpen}
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

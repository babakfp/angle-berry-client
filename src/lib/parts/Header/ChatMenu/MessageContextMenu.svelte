<script lang="ts">
    import { contextMenuTargetEvent, isContextMenuOpen } from "./chatStores"

    let contextMenu: HTMLDivElement

    $: if (contextMenu && $isContextMenuOpen) {
        let x = $contextMenuTargetEvent!.clientX + 14
        let y = $contextMenuTargetEvent!.clientY

        if (
            $contextMenuTargetEvent!.clientX + contextMenu.offsetWidth >
            window.innerWidth
        ) {
            x -= contextMenu.offsetWidth + 26
        }
        if (
            $contextMenuTargetEvent!.clientY + contextMenu.offsetHeight >
            window.innerHeight
        ) {
            y -= contextMenu.offsetHeight
            contextMenu.style.transform = "translateY(1.25rem)"
        }

        contextMenu.style.left = `${x}px`
        contextMenu.style.top = `${y}px`
    }
</script>

{#if $isContextMenuOpen}
    <div
        bind:this={contextMenu}
        class="absolute z-50 -translate-y-5"
        on:contextmenu|preventDefault
    >
        <ul
            class="max-h-56 min-w-36 max-w-48 overflow-y-auto overscroll-y-contain rounded bg-gray-600 p-1 text-xs shadow"
        >
            <slot />
        </ul>
    </div>
{/if}

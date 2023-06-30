<script>
    export let e
    export let isOpen = false

    let contextMenu

    $: if (contextMenu && isOpen) {
        let positionX = e.clientX
        let positionY = e.clientY

        if (e.clientX + contextMenu.offsetWidth > window.innerWidth) {
            positionX = positionX - contextMenu.offsetWidth
        }
        if (e.clientY + contextMenu.offsetHeight > window.innerHeight) {
            positionY = positionY - contextMenu.offsetHeight
            contextMenu.style.transform = "translateY(1.25rem)"
        }

        contextMenu.style.left = `${positionX}px`
        contextMenu.style.top = `${positionY}px`
    }
</script>

{#if isOpen}
    <div
        bind:this={contextMenu}
        class="absolute z-50 -translate-y-5"
        on:pointerleave={() => (isOpen = false)}
    >
        <!-- Close the menu when moved out of the bunding area -->
        <div
            class="absolute -inset-8 -z-1"
            on:pointerdown={() => (isOpen = false)}
            on:contextmenu|preventDefault
        />
        <ul
            class="max-h-56 w-36 overflow-y-auto overscroll-y-contain rounded bg-gray-800 p-1 text-xs shadow"
        >
            <slot />
        </ul>
    </div>
{/if}

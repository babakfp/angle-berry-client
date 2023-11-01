<script>
    export let title = ""
    export let description = ""
    export let isOpen = false
    export let isFullSize = false
</script>

<svelte:window
    on:keydown={e => {
        if (e.key === "Escape") isOpen = false
    }}
/>

{#if isOpen}
    <div
        class="fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-gray-800/50
            {isFullSize ? 'p-0 sm:p-8' : 'p-8'}"
        on:click|self={() => (isOpen = false)}
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

                <slot />
            </div>

            <div
                class="sticky bottom-0 flex justify-end gap-2 self-end border-t border-gray-600 bg-gray-700 px-6 py-4"
            >
                <slot name="actions" />
            </div>
        </div>
    </div>
{/if}

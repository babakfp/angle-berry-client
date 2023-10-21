<script>
    export let title = ""
    export let description = ""
    export let isOpen = false
</script>

<svelte:window
    on:keydown={e => {
        if (e.key === "Escape") isOpen = false
    }}
/>

{#if isOpen}
    <div
        class="fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-gray-800/50 p-8"
        on:click={() => (isOpen = false)}
    >
        <div
            class="max-w-md overflow-y-auto overscroll-y-contain rounded bg-gray-700 p-6 drop-shadow"
        >
            <h6 class="text-lg">{title}</h6>
            <p>{description}</p>
            <div class="mt-4 flex justify-end gap-2">
                <slot name="actions" />
            </div>
        </div>
    </div>
{/if}

<script>
    export let isOpen = false
</script>

<svelte:window
    on:keydown={e => {
        if (e.key === "Escape") isOpen = false
    }}
/>

{#if isOpen}
    <div
        class="fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-gray-900/50 p-8"
        on:click={() => (isOpen = false)}
    >
        <div
            class="max-w-md overflow-y-auto overscroll-y-contain rounded bg-gray-800 p-6 drop-shadow"
        >
            <slot />
        </div>
    </div>
{/if}

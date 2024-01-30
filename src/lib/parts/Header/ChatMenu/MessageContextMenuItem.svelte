<script lang="ts">
    import type { ComponentType } from "svelte"

    export let title: string
    export let isDisabled = false
    export let _class = ""
    export { _class as class }
    export let icon: ComponentType
</script>

<li class="flex">
    <button
        type="button"
        class="{_class} flex h-8.5 w-full items-center gap-2 rounded px-3 hover:bg-gray-700
		{isDisabled && 'pointer-events-none opacity-25'}"
        disabled={isDisabled}
        on:click
    >
        <div class="flex text-sm sm:text-base">
            <svelte:component this={icon} />
        </div>
        <span>{title}</span>
    </button>
</li>

<script>
    export let title
    export let isDisabled = false
    export let _class = ""
    export { _class as class }
</script>

<li class="flex">
    <button
        class="{_class} flex h-8.5 w-full items-center gap-2 rounded px-3 hover:bg-white/5
		{isDisabled && 'pointer-events-none opacity-50'}"
        disabled={isDisabled}
        on:click
    >
        <div class="flex text-sm sm:text-base">
            <slot />
        </div>
        <!-- Remove the styles if you change the font -->
        <span class="pt-1">{title}</span>
    </button>
</li>

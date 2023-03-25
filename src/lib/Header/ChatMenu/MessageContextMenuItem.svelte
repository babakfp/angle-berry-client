<script>
	export let title
</script>

<li class="flex">
	<button
		class="flex w-full items-center gap-2 rounded px-3 py-2 hover:bg-white/5"
		on:click
	>
		<slot />
		<!-- Remove the styles if you change the font -->
		<span class="pt-0.5">{title}</span>
	</button>
</li>

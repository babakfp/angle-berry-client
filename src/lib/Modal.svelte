<script>
	// import OutClick from "svelte-outclick"
	export let isOpen = false
	// export let toggleElements = false
</script>

<svelte:window
	on:keydown={e => {
		if (e.key === "Escape") isOpen = false
	}}
/>

{#if isOpen}
	<!-- <OutClick
		on:outclick={() => (isOpen = false)}
		excludeElements={toggleElements}
	> -->
	<div
		class="fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-gray-800/50 p-8"
		on:click={() => (isOpen = false)}
	>
		<!-- Inner -->
		<div
			class="max-w-md overflow-y-auto rounded bg-gray-700 p-6 drop-shadow"
		>
			<slot />
		</div>
	</div>
	<!-- </OutClick> -->
{/if}

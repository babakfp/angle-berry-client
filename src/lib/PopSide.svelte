<script>
	import OutClick from "svelte-outclick"
	import { browser } from "$app/environment"
	import { beforeNavigate } from "$app/navigation"

	export let isOpen = false
	export let toggleButton = null
	export let id = null

	beforeNavigate(() => (isOpen = false))

	$: if (browser) {
		if (isOpen) {
			document.body.classList.add("overflow-hidden")
		} else {
			document.body.classList.remove("overflow-hidden")
		}
	}
</script>

<svelte:window
	on:keydown={e => {
		if (e.key === "Escape") isOpen = false
	}}
/>

<div
	class="hidden sm:fixed sm:inset-0 sm:top-header-height sm:z-40 sm:block sm:bg-[black]/40 sm:duration-300 sm:hide
	{isOpen && 'sm:show'}"
/>

<OutClick on:outclick={() => (isOpen = false)} excludeElements={toggleButton}>
	<div
		{id}
		class="PopSide h-dscreen fixed inset-0 z-50 grid translate-x-full grid-rows-[auto_1fr_auto] overflow-y-auto bg-gray-800 duration-300 hide
		{isOpen && '!translate-x-0 !show'}
		sm:top-header-height sm:left-auto sm:z-40 sm:w-96
	"
	>
		<button
			class="sticky top-0 z-1 flex h-14 w-full items-center justify-between self-start border-b border-white/5 bg-gray-800 px-4 outline-inset sm:hidden"
			on:click={() => (isOpen = false)}
		>
			<span>Close</span>
			<!-- prettier-ignore -->
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
				<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
			</svg>
		</button>

		<slot />
	</div>
</OutClick>

<style lang="postcss">
	.PopSide {
		@screen sm {
			max-height: calc(100vh - theme(spacing.header-height));
			max-height: calc(100dvh - theme(spacing.header-height));
		}
	}
</style>

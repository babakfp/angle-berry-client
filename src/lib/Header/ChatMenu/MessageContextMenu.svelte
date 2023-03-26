<script>
	export let e
	export let isOpen = false

	let contextMenu

	$: if (contextMenu) {
		let positionX = e.offsetX
		let positionY = e.offsetY

		if (e.clientX + contextMenu.offsetWidth > window.innerWidth) {
			positionX = positionX - contextMenu.offsetWidth
		}
		// 64: header height, 56.8: chat input height
		if (
			e.clientY + contextMenu.offsetHeight >
			window.innerHeight - 64 - 56.8
		) {
			positionY = positionY - contextMenu.offsetHeight

			contextMenu.style.transform = "translateY(1.25rem)"
		}

		contextMenu.style.left = `${positionX}px`
		contextMenu.style.top = `${positionY}px`
	}
</script>

{#if isOpen}
	<ul
		bind:this={contextMenu}
		class="MessageContextMenu absolute z-50 max-h-56 w-36 -translate-y-5 overflow-y-auto overscroll-y-contain rounded bg-gray-700 p-1 text-xs shadow"
	>
		<slot />
	</ul>
{/if}

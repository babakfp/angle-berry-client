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
		if (e.clientY + contextMenu.offsetHeight > window.innerHeight) {
			positionY = positionY - contextMenu.offsetHeight
		}

		contextMenu.style.left = `${positionX}px`
		contextMenu.style.top = `${positionY}px`
	}
</script>

{#if isOpen}
	<ul
		bind:this={contextMenu}
		class="MessageContextMenu absolute max-h-56 w-36 -translate-y-5 overflow-y-auto overscroll-y-contain rounded bg-gray-700 p-1 text-xs shadow"
	>
		<slot />
	</ul>
{/if}

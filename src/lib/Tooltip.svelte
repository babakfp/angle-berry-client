<script>
	export let position = "top" // top, right, bottom, left
	export let isVisible = false
	export let parentElementQuerySelector = ""
	let rootElement

	$: if (rootElement && isVisible) {
		if (parentElementQuerySelector) {
			const parentElement = document.querySelector(
				parentElementQuerySelector
			)
			if (parentElement) {
				const rootElementRect = rootElement.getBoundingClientRect()
				const parentElementRect = parentElement.getBoundingClientRect()
				let isTopNotFullyVisible = false
				let isRightNotFullyVisible = false
				let isBottomNotFullyVisible = false
				let isLeftNotFullyVisible = false

				if (rootElementRect.top < parentElementRect.top) {
					isTopNotFullyVisible = true
				}
				if (rootElementRect.right > parentElementRect.right) {
					isRightNotFullyVisible = true
				}
				if (rootElementRect.bottom > parentElementRect.bottom) {
					isBottomNotFullyVisible = true
				}
				if (rootElementRect.left < parentElementRect.left) {
					isLeftNotFullyVisible = true
				}

				if (isTopNotFullyVisible && isRightNotFullyVisible) {
					position = "bottom-right"
				} else if (isTopNotFullyVisible && isLeftNotFullyVisible) {
					position = "bottom-left"
				}
				// TODO: Not tested.
				else if (isBottomNotFullyVisible && isRightNotFullyVisible) {
					position = "top-right"
				} else if (isBottomNotFullyVisible && isLeftNotFullyVisible) {
					position = "top-left"
				}
				// TODO: Not tested.
				else {
					if (isTopNotFullyVisible) position = "bottom"
					if (isRightNotFullyVisible) position = "left"
					if (isBottomNotFullyVisible) position = "top"
					if (isLeftNotFullyVisible) position = "right"
				}

				// console.log("rootElementRect", rootElementRect)
				// console.log("parentElementRect", parentElementRect)
			}
		}
	}
</script>

<!-- prettier-ignore -->
<div
	bind:this={rootElement}
	class="
		absolute hidden whitespace-nowrap rounded bg-gray-700 py-2 pl-3 pr-4 text-xs drop-shadow z-50 group-hover:block {isVisible ? 'block' : ''}
		after:absolute after:block after:h-0 after:w-0 after:border-solid after:border-[transparent]
		{position === 'top' ? 'arrow-bottom bottom-full -translate-y-2 inset-x-center after:top-full after:inset-x-center' : ''}
		{position === 'right' ? 'arrow-left left-full translate-x-2 inset-y-center after:right-full after:inset-y-center' : ''}
		{position === 'bottom' ? 'arrow-top top-full translate-y-2 inset-x-center after:bottom-full after:inset-x-center' : ''}
		{position === 'left' ? 'arrow-right right-full -translate-x-2 inset-y-center after:left-full after:inset-y-center' : ''}

		{position === 'bottom-right' ? 'arrow-top top-full right-0 translate-y-2 after:bottom-full after:right-4' : ''}
		{position === 'bottom-left' ? 'arrow-top top-full left-0 translate-y-2 after:bottom-full after:left-4' : ''}
	"
>
	<slot />
</div>

<style>
	:root {
		--arrow-color: theme(colors.gray.700);
		--arrow-size: theme(spacing.1);
	}
	.arrow-top::after {
		border-left-width: var(--arrow-size);
		border-right-width: var(--arrow-size);
		border-bottom-color: var(--arrow-color);
		border-bottom-width: var(--arrow-size);
	}
	.arrow-bottom::after {
		border-left-width: var(--arrow-size);
		border-right-width: var(--arrow-size);
		border-top-color: var(--arrow-color);
		border-top-width: var(--arrow-size);
	}
	.arrow-right::after {
		border-top-width: var(--arrow-size);
		border-bottom-width: var(--arrow-size);
		border-left-color: var(--arrow-color);
		border-left-width: var(--arrow-size);
	}
	.arrow-left::after {
		border-top-width: var(--arrow-size);
		border-bottom-width: var(--arrow-size);
		border-right-color: var(--arrow-color);
		border-right-width: var(--arrow-size);
	}
</style>

<script>
	export let position = "top" // top, right, bottom, left
	export let isVisible = false
	export let parentElementQuerySelector = ""

	let tooltip

	$: if (tooltip && isVisible) {
		if (parentElementQuerySelector) {
			const parentElement = document.querySelector(
				parentElementQuerySelector
			)
			if (parentElement) {
				const rootElementRect = tooltip.getBoundingClientRect()
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
			}
		}
	}
</script>

<!-- right-top right-bottom left-top left-bottom -->
<!-- prettier-ignore -->
<div
	bind:this={tooltip}
	class="
		absolute hidden whitespace-nowrap rounded bg-gray-700 py-2 pl-3 pr-4 text-xs drop-shadow z-50 group-hover:block {isVisible && 'block'}
		after:absolute after:block after:h-0 after:w-0 after:border-solid after:border-[transparent]
		{(position === 'top' || position === 'top-right' || position === 'top-left') && 'arrow-bottom bottom-full -translate-y-2 after:top-full'}
		{(position === 'right' || position === 'right-top' || position === 'right-bottom') && 'arrow-left left-full translate-x-2 after:right-full'}
		{(position === 'bottom' || position === 'bottom-right' || position === 'bottom-left') && 'arrow-top top-full translate-y-2 after:bottom-full'}
		{(position === 'left' || position === 'left-top' || position === 'left-bottom') && 'arrow-right right-full -translate-x-2 after:left-full'}

		{position === 'top' && 'inset-x-center after:inset-x-center'}
		{position === 'right' && 'inset-y-center after:inset-y-center'}
		{position === 'bottom' && 'inset-x-center after:inset-x-center'}
		{position === 'left' && 'inset-y-center after:inset-y-center'}

		{(position === 'top-right' || position === 'bottom-right') && 'right-0 after:right-4'}
		{(position === 'top-left' || position === 'bottom-left') && 'left-0 after:left-4'}

		{(position === 'right-top' || position === 'left-top') && 'top-0 after:top-4'}
		{(position === 'right-bottom' || position === 'left-bottom') && 'bottom-0 after:bottom-4'}
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
		border-bottom-width: var(--arrow-size);
		border-bottom-color: var(--arrow-color);
	}
	.arrow-bottom::after {
		border-left-width: var(--arrow-size);
		border-right-width: var(--arrow-size);
		border-top-width: var(--arrow-size);
		border-top-color: var(--arrow-color);
	}
	.arrow-right::after {
		border-top-width: var(--arrow-size);
		border-bottom-width: var(--arrow-size);
		border-left-width: var(--arrow-size);
		border-left-color: var(--arrow-color);
	}
	.arrow-left::after {
		border-top-width: var(--arrow-size);
		border-bottom-width: var(--arrow-size);
		border-right-width: var(--arrow-size);
		border-right-color: var(--arrow-color);
	}
</style>

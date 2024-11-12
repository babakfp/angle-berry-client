<script lang="ts">
    import type { Snippet } from "svelte"

    let {
        position = $bindable("top"),
        isVisible,
        keepAlive,
        parentElementQuerySelector,
        children,
    }: {
        position?: string
        isVisible?: boolean
        keepAlive?: boolean
        parentElementQuerySelector?: string
        children?: Snippet
    } = $props()

    let tooltip = $state<HTMLDivElement>()

    $effect(() => {
        if (tooltip && parentElementQuerySelector && isVisible) {
            const parentElement = document.querySelector(
                parentElementQuerySelector,
            )

            const rootElementRect = tooltip.getBoundingClientRect()
            const parentElementRect = parentElement!.getBoundingClientRect()
            let isTopNotFullyVisible = false
            let isBottomNotFullyVisible = false

            if (rootElementRect.top < parentElementRect.top) {
                isTopNotFullyVisible = true
            }
            if (rootElementRect.bottom > parentElementRect.bottom) {
                isBottomNotFullyVisible = true
            }

            if (isTopNotFullyVisible) {
                if (position.includes("-")) {
                    position = position.replace("top", "bottom")
                } else {
                    position = "bottom"
                }
            } else if (isBottomNotFullyVisible) {
                if (position.includes("-")) {
                    position = position.replace("bottom", "top")
                } else {
                    position = "top"
                }
            }
        }
    })
</script>

<!-- prettier-ignore -->
<div
	bind:this={tooltip}
	class="
		absolute hide whitespace-nowrap rounded bg-gray-700 px-4 py-3 text-xs drop-shadow z-50 duration-200 group-hover:show {isVisible && 'show'}
		after:absolute after:block after:h-0 after:w-0 after:border-solid after:border-[transparent]

		before:block before:absolute
		{
			((position === 'top' || position === 'top-right' || position === 'top-left') ||
			(position === 'bottom' || position === 'bottom-right' || position === 'bottom-left')) &&
		 	'before:inset-x-0 before:h-2 before:w-full'
		}
		{
			((position === 'right' || position === 'right-top' || position === 'right-bottom') ||
			(position === 'left' || position === 'left-top' || position === 'left-bottom')) &&
		 	'before:inset-y-0 before:h-full before:w-2'
		}

		{!keepAlive && 'before:[all:unset]'}

		{(position === 'top' || position === 'top-right' || position === 'top-left') && 'arrow-bottom bottom-full -translate-y-4 before:top-full after:top-full group-hover:-translate-y-2'}
		{(position === 'right' || position === 'right-top' || position === 'right-bottom') && 'arrow-left left-full translate-x-4 before:right-full after:right-full group-hover:translate-x-2'}
		{(position === 'bottom' || position === 'bottom-right' || position === 'bottom-left') && 'arrow-top top-full translate-y-4 before:bottom-full after:bottom-full group-hover:translate-y-2'}
		{(position === 'left' || position === 'left-top' || position === 'left-bottom') && 'arrow-right right-full -translate-x-4 before:left-full after:left-full group-hover:-translate-x-2'}

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
	{@render children?.()}
</div>

<style lang="postcss">
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

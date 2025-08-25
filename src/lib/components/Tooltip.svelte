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

<div
    bind:this={tooltip}
    class={[
        "hide group-hover:show absolute z-50 rounded bg-gray-700 px-4 py-3 text-xs whitespace-nowrap drop-shadow duration-200",
        { show: isVisible },
        "after:absolute after:block after:h-0 after:w-0 after:border-solid after:border-transparent",
        "before:absolute before:block",
        {
            "before:inset-x-0 before:h-2 before:w-full": [
                "top",
                "top-right",
                "top-left",
                "bottom",
                "bottom-right",
                "bottom-left",
            ].includes(position),
            "before:inset-y-0 before:h-full before:w-2": [
                "right",
                "right-top",
                "right-bottom",
                "left",
                "left-top",
                "left-bottom",
            ].includes(position),

            "before:[all:unset]": !keepAlive,

            "arrow-bottom bottom-full -translate-y-4 group-hover:-translate-y-2 before:top-full after:top-full":
                ["top", "top-right", "top-left"].includes(position),
            "arrow-left left-full translate-x-4 group-hover:translate-x-2 before:right-full after:right-full":
                ["right", "right-top", "right-bottom"].includes(position),
            "arrow-top top-full translate-y-4 group-hover:translate-y-2 before:bottom-full after:bottom-full":
                ["bottom", "bottom-right", "bottom-left"].includes(position),
            "arrow-right right-full -translate-x-4 group-hover:-translate-x-2 before:left-full after:left-full":
                ["left", "left-top", "left-bottom"].includes(position),

            "inset-x-center after:inset-x-center": position === "top",
            "inset-y-center after:inset-y-center": position === "right",
            "inset-x-center after:inset-x-center": position === "bottom",
            "inset-y-center after:inset-y-center": position === "left",

            "right-0 after:right-4": ["top-right", "bottom-right"].includes(
                position,
            ),
            "left-0 after:left-4": ["top-left", "bottom-left"].includes(
                position,
            ),

            "top-0 after:top-4": ["right-top", "left-top"].includes(position),
            "bottom-0 after:bottom-4": ["right-bottom", "left-bottom"].includes(
                position,
            ),
        },
    ]}
>
    {@render children?.()}
</div>

<style>
    @reference "../app.css";

    :root {
        --arrow-color: var(--color-gray-700);
        --arrow-size: var(--spacing-1);
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

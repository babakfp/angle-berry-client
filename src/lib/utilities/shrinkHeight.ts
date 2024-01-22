type Options = {
    delay?: number
    duration?: number
    easing?: (t: number) => number
}

export const shrinkHeight = (node: HTMLElement, options?: Options) => {
    node.style.overflow = "hidden"

    const style = getComputedStyle(node)
    const height = parseFloat(style.height)
    const paddingTop = parseFloat(style.paddingTop)
    const paddingBottom = parseFloat(style.paddingBottom)
    const borderTopWidth = parseFloat(style.borderTopWidth)
    const borderBottomWidth = parseFloat(style.borderBottomWidth)

    return {
        delay: options?.delay || 0,
        duration: options?.duration || 500,
        easing: options?.easing || undefined,
        css: (t: number) => `
            height: ${t * height}px;
            padding-top: ${t * paddingTop}px;
            padding-bottom: ${t * paddingBottom}px;
            border-top-width: ${t * borderTopWidth}px;
            border-bottom-width: ${t * borderBottomWidth}px;
            opacity: ${t};
        `,
    }
}

/**
 * @param element {HTMLTextAreaElement}
 */
export function getTextareaLineCount(element) {
    const scrollHeight = element.scrollHeight
    const style = getComputedStyle(element)
    const lineHeight = parseInt(style.lineHeight)
    const paddingTop = parseInt(style.paddingTop)
    const paddingBottom = parseInt(style.paddingBottom)
    const pureScrollHeight = scrollHeight - paddingTop - paddingBottom
    const lineCount = pureScrollHeight / lineHeight
    return lineCount
}

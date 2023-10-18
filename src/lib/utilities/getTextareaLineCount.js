/**
 * @param textarea {Element}
 */
export function getTextareaLineCount(textarea) {
    const scrollHeight = textarea.scrollHeight
    const style = getComputedStyle(textarea)
    const lineHeight = parseInt(style.lineHeight)
    const paddingTop = parseInt(style.paddingTop)
    const paddingBottom = parseInt(style.paddingBottom)
    const pureScrollHeight = scrollHeight - paddingTop - paddingBottom
    const lineCount = pureScrollHeight / lineHeight
    return lineCount
}

<script lang="ts">
    import type { MouseEventHandler } from "svelte/elements"
    import InputTextButton from "./InputTextButton.svelte"

    let {
        isActive,
        activeText,
        inActiveText,
        onclick,
    }: {
        isActive?: boolean
        activeText: string
        inActiveText: string
        onclick: MouseEventHandler<HTMLButtonElement>
    } = $props()
</script>

<InputTextButton class="overflow-hidden" {onclick}>
    <span class={["duration-200", { "scale-50 hide": isActive }]}>
        {activeText}
    </span>
    <span class={["absolute duration-200", { "scale-50 hide": !isActive }]}>
        {inActiveText}
    </span>
</InputTextButton>

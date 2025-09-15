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
    <span class={["duration-150", { "hide scale-50": isActive }]}>
        {activeText}
    </span>
    <span class={["absolute duration-150", { "hide scale-50": !isActive }]}>
        {inActiveText}
    </span>
</InputTextButton>

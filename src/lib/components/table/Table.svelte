<script lang="ts">
    import type { Snippet } from "svelte"

    let {
        class: class_,
        children,
    }: {
        class?: string
        children?: Snippet
    } = $props()
</script>

<div
    class={[
        class_,
        "overflow-x-auto rounded border border-gray-50/5 whitespace-nowrap shadow-md",
    ]}
>
    <table class="w-full text-left text-sm text-gray-400">
        {@render children?.()}
    </table>
</div>

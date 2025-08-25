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
        "overflow-x-auto whitespace-nowrap rounded border border-gray-50/5 shadow-md",
    ]}
>
    <table class="w-full text-left text-sm text-gray-400">
        {@render children?.()}
    </table>
</div>

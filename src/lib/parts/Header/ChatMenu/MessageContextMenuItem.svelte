<script lang="ts">
    import type { Component } from "svelte"
    import type { MouseEventHandler } from "svelte/elements"

    let {
        title,
        isDisabled,
        class: class_,
        icon,
        onclick,
    }: {
        title: string
        isDisabled?: boolean
        class?: string
        icon: Component
        onclick: MouseEventHandler<HTMLButtonElement>
    } = $props()

    const SvelteComponent = $derived(icon)
</script>

<li class="flex">
    <button
        type="button"
        class={[
            class_,
            "flex h-8.5 w-full items-center gap-2 rounded pr-3 pl-2 hover:bg-gray-700",
            { "pointer-events-none opacity-25": isDisabled },
        ]}
        disabled={isDisabled}
        {onclick}
    >
        <div class="flex text-sm sm:text-base">
            <SvelteComponent />
        </div>
        <span>{title}</span>
    </button>
</li>

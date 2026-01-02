<script lang="ts">
    import type { Component } from "svelte"
    import type { ClassValue, MouseEventHandler } from "svelte/elements"

    let {
        title,
        disabled,
        class: class_,
        Icon,
        onclick,
    }: {
        title: string
        disabled?: boolean
        class?: ClassValue
        Icon: Component
        onclick: MouseEventHandler<HTMLButtonElement>
    } = $props()
</script>

<li class="flex">
    <button
        type="button"
        class={[
            class_,
            "flex h-8.5 w-full items-center gap-2 rounded pr-3 pl-2 hover:bg-gray-700",
            { "pointer-events-none opacity-25": disabled },
        ]}
        {disabled}
        {onclick}
    >
        <div class="flex text-sm sm:text-base">
            <Icon />
        </div>
        <span>{title}</span>
    </button>
</li>

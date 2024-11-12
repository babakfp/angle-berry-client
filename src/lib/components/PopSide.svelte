<script lang="ts">
    import IconXRegular from "phosphor-icons-svelte/IconXRegular.svelte"
    import type { Snippet } from "svelte"
    import { OutClick } from "svelte-outclick"
    import { beforeNavigate } from "$app/navigation"

    let {
        isOpen = $bindable(),
        toggleButton,
        id,
        children,
        outer,
    }: {
        isOpen?: boolean
        toggleButton: HTMLButtonElement
        id?: string
        children?: Snippet
        outer?: Snippet
    } = $props()

    beforeNavigate(() => (isOpen = false))

    $effect(() => {
        if (isOpen) {
            document.body.classList.add("overflow-hidden")
        } else {
            document.body.classList.remove("overflow-hidden")
        }
    })
</script>

<svelte:window
    onkeydown={(e) => {
        if (e.key === "Escape") isOpen = false
    }}
/>

<div
    class="hidden sm:fixed sm:inset-0 sm:top-header sm:z-40 sm:block sm:bg-[black]/40 sm:duration-200 sm:hide
	{isOpen && 'sm:show'}"
></div>

<OutClick onOutClick={() => (isOpen = false)} excludeElements={toggleButton}>
    <div
        id={id || undefined}
        class="fixed inset-0 z-50 grid h-screen translate-x-full grid-rows-[auto_1fr_auto] bg-body-bg duration-200 hide
			{isOpen && '!translate-x-0 !show'}
			sm:left-auto sm:top-header sm:z-40 sm:h-screen-minus-header sm:w-96 sm:grid-rows-[1fr_auto]
		"
    >
        <button
            type="button"
            class="sticky top-0 z-1 flex h-14 w-full items-center justify-between self-start border-b border-gray-50/5 bg-body-bg px-4 outline-inset sm:hidden"
            onclick={() => (isOpen = false)}
        >
            <span>Close</span>
            <IconXRegular class="text-2xl" />
        </button>

        {@render children?.()}
    </div>

    {@render outer?.()}
</OutClick>

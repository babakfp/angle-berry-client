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
    class={[
        "sm:top-header sm:hide hidden sm:fixed sm:inset-0 sm:z-40 sm:block sm:bg-[black]/40 sm:duration-150",
        { "sm:show": isOpen },
    ]}
></div>

<OutClick onOutClick={() => (isOpen = false)} excludeElements={toggleButton}>
    <div
        id={id || undefined}
        class={[
            "bg-background hide fixed inset-0 z-50 grid h-screen translate-x-8 grid-rows-[auto_1fr_auto] duration-150",
            { "show! translate-x-0!": isOpen },
            "sm:top-header sm:h-screen-minus-header sm:left-auto sm:z-40 sm:w-96 sm:grid-rows-[1fr_auto]",
        ]}
    >
        <button
            type="button"
            class="bg-background outline-inset sticky top-0 z-1 flex h-14 w-full items-center justify-between self-start border-b border-gray-50/5 px-4 sm:hidden"
            onclick={() => (isOpen = false)}
        >
            <span>Close</span>
            <IconXRegular class="text-2xl" />
        </button>

        {@render children?.()}
    </div>

    {@render outer?.()}
</OutClick>

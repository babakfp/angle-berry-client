<script lang="ts">
    import { Dialog } from "@ark-ui/svelte/dialog"
    import { Portal } from "@ark-ui/svelte/portal"
    import IconXRegular from "phosphor-icons-svelte/IconXRegular.svelte"
    import type { Snippet } from "svelte"
    import { beforeNavigate } from "$app/navigation"

    let {
        title,
        isOpen = $bindable(),
        Trigger,
        children,
    }: {
        title?: string
        isOpen?: boolean
        Trigger: Snippet
        children: Snippet
    } = $props()

    beforeNavigate(() => (isOpen = false))
</script>

<Dialog.Root bind:open={isOpen} modal={false}>
    {@render Trigger()}
    <Portal>
        <!-- TODO: --z-index -->
        <Dialog.Backdrop
            class={[
                "sm:top-header fixed inset-0 top-0 z-40 bg-[black]/40",
                "data-[state=open]:animate-in data-[state=open]:fade-in",
                "data-[state=closed]:animate-out data-[state=closed]:fade-out",
            ]}
        />
        <Dialog.Positioner>
            <Dialog.Content
                class={[
                    "bg-background fixed inset-0 z-50 grid h-screen grid-rows-[auto_1fr_auto]",
                    "data-[state=open]:animate-in data-[state=open]:fade-in",
                    "data-[state=closed]:animate-out data-[state=closed]:fade-out",
                ]}
            >
                <Dialog.CloseTrigger
                    class="bg-background outline-inset sticky top-0 z-1 flex h-14 w-full items-center justify-between self-start border-b border-gray-50/5 px-4 sm:hidden"
                    onclick={() => (isOpen = false)}
                >
                    <Dialog.Title>{title || "Close"}</Dialog.Title>
                    <IconXRegular class="text-2xl" />
                </Dialog.CloseTrigger>

                {@render children()}
            </Dialog.Content>
        </Dialog.Positioner>
    </Portal>
</Dialog.Root>

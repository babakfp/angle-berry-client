<script lang="ts">
    import { Dialog } from "@ark-ui/svelte/dialog"
    import { Portal } from "@ark-ui/svelte/portal"
    import IconXRegular from "phosphor-icons-svelte/IconXRegular.svelte"
    import type { Snippet } from "svelte"
    import { beforeNavigate } from "$app/navigation"

    let {
        title,
        isOpen = $bindable(),
        DialogTrigger,
        children,
        outer,
    }: {
        title?: string
        isOpen?: boolean
        DialogTrigger: Snippet
        children: Snippet
        outer?: Snippet
    } = $props()

    beforeNavigate(() => (isOpen = false))
</script>

<Dialog.Root bind:open={isOpen} modal={false}>
    {@render DialogTrigger()}
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
                    "data-[state=open]:animate-in data-[state=open]:fade-in data-[state=open]:slide-in-from-bottom-4",
                    "data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=closed]:slide-out-to-bottom-4",
                    "sm:top-header sm:h-screen-minus-header sm:left-auto sm:z-40 sm:w-96 sm:grid-rows-[1fr_auto]",
                    "sm:data-[state=open]:slide-in-from-bottom-0 sm:data-[state=open]:slide-in-from-right-4",
                    "sm:data-[state=closed]:slide-out-to-bottom-0 sm:data-[state=closed]:slide-out-to-right-4",
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

            <!-- TODO: Is it the right place to put this? -->
            {@render outer?.()}
        </Dialog.Positioner>
    </Portal>
</Dialog.Root>

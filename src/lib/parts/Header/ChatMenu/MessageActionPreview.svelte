<script lang="ts">
    import IconXRegular from "phosphor-icons-svelte/IconXRegular.svelte"
    import type { MouseEventHandler } from "svelte/elements"
    import { goToMessage } from "$lib/parts/Header/ChatMenu/goToMessage"

    let {
        title,
        content,
        messageId,
        isOpen = $bindable(false),
        onClose,
    }: {
        title: string
        content: string
        messageId: string
        isOpen?: boolean
        onClose: () => void
    } = $props()

    let interval: number | undefined

    const handleJumpToMessage = () => {
        interval = goToMessage(messageId, interval)
    }

    const handleClosing = () => {
        isOpen = false
        onClose()
    }
</script>

{#if isOpen}
    <div
        class="grid grid-cols-[1fr_auto] items-stretch justify-between border-t border-gray-50/5 text-sm shadow-[0_-1px_3px_0_rgb(0_0_0/0.1),0_-1px_2px_-1px_rgb(0_0_0/0.1)]"
    >
        <button
            type="button"
            class="outline-inset block w-full py-4 pl-4 text-left hover:bg-gray-50/5"
            onclick={handleJumpToMessage}
        >
            <div class="text-xs text-gray-500">{title}</div>
            <div class="line-clamp-1">{@html content}</div>
        </button>
        <button
            type="button"
            class="outline-inset flex p-4 hover:bg-gray-50/5"
            onclick={handleClosing}
        >
            <IconXRegular />
        </button>
    </div>
{/if}

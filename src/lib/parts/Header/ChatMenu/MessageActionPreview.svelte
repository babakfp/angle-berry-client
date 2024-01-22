<!-- Used for reply and edit preview -->

<script lang="ts">
    import { createEventDispatcher } from "svelte"
    import { goToMessage } from "$parts/Header/ChatMenu/goToMessage"
    import IconXRegular from "phosphor-icons-svelte/IconXRegular.svelte"

    export let title: string
    export let content: string
    export let messageId: string
    export let isOpen = false

    const dispatch = createEventDispatcher()

    let interval: number | undefined

    const handleJumpToMessage = () => {
        interval = goToMessage(messageId, interval)
    }

    const handleClosing = () => {
        isOpen = false
        dispatch("close")
    }
</script>

{#if isOpen}
    <div
        class="grid grid-cols-[1fr_auto] items-stretch justify-between border-t border-white/5 text-sm shadow-[0_-1px_3px_0_rgb(0_0_0_/_0.1),_0_-1px_2px_-1px_rgb(0_0_0_/_0.1)]"
    >
        <button
            class="block w-full py-4 pl-4 text-left outline-inset hover:bg-white/5"
            type="button"
            on:click={handleJumpToMessage}
        >
            <div class="text-xs text-gray-500">{title}</div>
            <div class="line-clamp-1">{@html content}</div>
        </button>
        <button
            class="flex p-4 outline-inset hover:bg-white/5"
            type="button"
            on:click={handleClosing}
        >
            <IconXRegular />
        </button>
    </div>
{/if}

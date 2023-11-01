<!-- Used for reply and edit preview -->

<script lang="ts">
    import { createEventDispatcher } from "svelte"
    import { goToMessage } from "$parts/Header/ChatMenu/goToMessage.js"
    import IconX from "$icons/IconX.svelte"

    export let title
    export let content
    export let messageId
    export let isOpen = false

    const dispatch = createEventDispatcher()

    /** @type {number | undefined} */
    let interval

    function handleJumpToMessage() {
        interval = goToMessage(messageId, interval)
    }

    function handleClosing() {
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
            <IconX />
        </button>
    </div>
{/if}

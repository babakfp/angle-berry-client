<script lang="ts">
    import { page } from "$app/stores"
    import { shrinkHeight } from "$utilities/shrinkHeight"
    import {
        isContextMenuOpen,
        isContextMenuOpen2,
        contextMenuTargetEvent,
        contextMenuTargetMessage,
        selectedMessageIds,
    } from "../chatStores"
    import MessageDateAndTime from "./MessageDateAndTime.svelte"
    import MessageReplyPreview from "./MessageReplyPreview.svelte"
    import IconCircle from "$icons/IconCircle.svelte"
    import IconCheckCircle from "$icons/IconCheckCircle.svelte"
    import { highlightAnimate } from "$utilities/highlightAnimate"

    export let message

    const isCurrentUser = message.expand.user.id === $page.data.user.id

    let interval: number | undefined

    let highlight: HTMLDivElement

    function handleClick(e) {
        if ($selectedMessageIds.length > 0) {
            if ($selectedMessageIds.includes(message.id)) {
                selectedMessageIds.update(v => v.filter(v => v !== message.id))
            } else {
                selectedMessageIds.update(v => [...v, message.id])
            }
        } else if (e.pointerType !== "mouse") {
            if ($isContextMenuOpen2) {
                isContextMenuOpen.set(false)
                contextMenuTargetEvent.set(null)
                contextMenuTargetMessage.set(null)
            } else {
                interval = highlightAnimate(highlight, interval)
                isContextMenuOpen.set(true)
                contextMenuTargetEvent.set(e)
                contextMenuTargetMessage.set(message)
            }
            $isContextMenuOpen2 = !$isContextMenuOpen2
        }
    }
</script>

<li id={message.id} class="w-full {isCurrentUser && 'ml-auto'}">
    <div
        class="relative grid px-4 py-2
        {$selectedMessageIds.includes(message.id) && 'bg-blue-400/10'}
        {$selectedMessageIds.length > 0 && 'cursor-pointer'}"
        in:shrinkHeight={{ duration: 200 }}
        out:shrinkHeight={{ duration: 200 }}
        on:contextmenu|preventDefault={e => {
            if (e.pointerType !== "mouse") return
            interval = highlightAnimate(highlight, interval)
            isContextMenuOpen.set(true)
            contextMenuTargetEvent.set(e)
            contextMenuTargetMessage.set(message)
        }}
    >
        <div
            bind:this={highlight}
            class="reply-highlight absolute inset-0 -z-1 bg-white/10 opacity-0 duration-200 ease-in-out"
        />

        {#if !isCurrentUser}
            <span class="mb-0.5 text-2xs font-semibold text-gray-500">
                {message.expand.user.username}
            </span>
        {/if}

        <div
            class="message-content-wrapper relative z-1 max-w-80 break-words rounded bg-gray-700 shadow {isCurrentUser
                ? 'justify-self-end rounded-br-[2px] !bg-[#7e6dd1] text-white'
                : 'justify-self-start rounded-tl-[2px]'}"
        >
            {#if message.expand?.repliedTo}
                {@const msg = message.expand?.repliedTo}
                <MessageReplyPreview
                    id={msg.id}
                    username={msg.expand.user.username}
                    content={msg.content}
                />
            {/if}

            <div class="select-text py-2 pl-3 pr-4" on:click={handleClick}>
                {@html message.content}
            </div>
        </div>

        <MessageDateAndTime
            {isCurrentUser}
            created={message.created}
            updated={message.updated}
        />

        {#if $selectedMessageIds.length > 0}
            <div
                class="absolute bottom-6 flex text-xl
                {isCurrentUser ? 'left-4' : 'right-4'}"
            >
                {#if $selectedMessageIds.includes(message.id)}
                    <IconCheckCircle class="text-green-400" />
                {:else}
                    <IconCircle />
                {/if}
            </div>
        {/if}

        <div class="absolute inset-0" on:click={handleClick} />
    </div>
</li>

<style lang="postcss">
    /* TODO: This is for when we add markdown support */
    .message-content-wrapper :global(a) {
        @apply break-all;
    }
</style>

<script>
    import { page } from "$app/stores"
    import { shrinkHeight } from "$utilities/shrinkHeight.js"
    import {
        isContextMenuOpen,
        contextMenuTargetEvent,
        contextMenuTargetMessage,
        selectedMessageIds,
    } from "../chatStores.js"
    import MessageDateAndTime from "./MessageDateAndTime.svelte"
    import MessageReplyPreview from "./MessageReplyPreview.svelte"
    import IconCircle from "$icons/IconCircle.svelte"
    import IconCheckCircle from "$icons/IconCheckCircle.svelte"

    export let message

    const isCurrentUser = message.expand.user.id === $page.data.user.id
</script>

<li id={message.id} class="w-full {isCurrentUser && 'ml-auto'}">
    <div
        class="relative grid px-4 py-2
        {$selectedMessageIds.includes(message.id) && 'bg-blue-400/10'}
        {$selectedMessageIds.length > 0 && 'cursor-pointer'}"
        in:shrinkHeight={{ duration: 200 }}
        out:shrinkHeight={{ duration: 200 }}
        on:click={() => {
            if (!$selectedMessageIds.length) return
            if ($selectedMessageIds.includes(message.id)) {
                selectedMessageIds.update(currentValue =>
                    currentValue.filter(v => v !== message.id),
                )
            } else {
                selectedMessageIds.update(currentValue => [
                    ...currentValue,
                    message.id,
                ])
            }
        }}
    >
        <div
            class="reply-highlight absolute inset-0 -z-1 bg-white/20 opacity-0 duration-200 ease-in-out"
        />

        {#if !isCurrentUser}
            <span class="text-xs font-semibold">
                {message.expand.user.username}
            </span>
        {/if}

        <div
            class="message-content-wrapper relative max-w-80 break-words rounded bg-gray-700 py-2 pl-3 pr-4 shadow
			{isCurrentUser
                ? 'justify-self-end rounded-br-[2px] !bg-[#7e6dd1] text-white'
                : 'mt-0.5 justify-self-start rounded-tl-[2px]'}
		"
            on:contextmenu|preventDefault={e => {
                isContextMenuOpen.set(true)
                contextMenuTargetEvent.set(e)
                contextMenuTargetMessage.set(message)
            }}
        >
            <MessageReplyPreview
                replyTargetMessage={message?.expand?.repliedTo}
            />

            <div class="select-text">
                {@html message.content}
            </div>
        </div>

        <MessageDateAndTime
            {isCurrentUser}
            created={message.created}
            updated={message.updated}
        />

        {#if $selectedMessageIds.length > 0}
            <div class="absolute bottom-6 left-4 flex text-xl">
                {#if $selectedMessageIds.includes(message.id)}
                    <IconCheckCircle class="text-green-400" />
                {:else}
                    <IconCircle />
                {/if}
            </div>
        {/if}
    </div>
</li>

<style lang="postcss">
    /* TODO: This is for when we add markdown support */
    .message-content-wrapper :global(a) {
        @apply break-all;
    }
</style>

<script lang="ts">
    import IconCheckCircleRegular from "phosphor-icons-svelte/IconCheckCircleRegular.svelte"
    import IconCircleRegular from "phosphor-icons-svelte/IconCircleRegular.svelte"
    import { highlightAnimate } from "$lib/utilities/highlightAnimate"
    import type {
        RealtimeMessagesResponse,
        UsersResponse,
    } from "$lib/utilities/pb"
    import { shrinkHeight } from "$lib/utilities/shrinkHeight"
    import {
        contextMenuTargetEvent,
        contextMenuTargetMessage,
        isContextMenuOpen,
        isTouchDeviceContextMenuOpen,
        selectedMessageIds,
    } from "../chatStores.svelte"
    import MessageDateAndTime from "./MessageDateAndTime.svelte"
    import MessageReplyPreview from "./MessageReplyPreview.svelte"

    let {
        loggedInUser,
        message,
    }: {
        loggedInUser: UsersResponse
        message: RealtimeMessagesResponse
    } = $props()

    const isCurrentUser = message.expand.user.id === loggedInUser.id

    let interval = $state<number>()

    let highlight = $state<HTMLDivElement>()

    const handleClick = (e: MouseEvent) => {
        if ($selectedMessageIds.length > 0) {
            if ($selectedMessageIds.includes(message.id)) {
                selectedMessageIds.update((v) =>
                    v.filter((v) => v !== message.id),
                )
            } else {
                selectedMessageIds.update((v) => [...v, message.id])
            }
            // @ts-expect-error TODO
        } else if (e.pointerType !== "mouse") {
            if ($isTouchDeviceContextMenuOpen) {
                isContextMenuOpen.state = false
                contextMenuTargetEvent.set(undefined)
                contextMenuTargetMessage.set(undefined)
            } else {
                if (highlight) {
                    interval = highlightAnimate(highlight, interval)
                }
                isContextMenuOpen.state = true
                contextMenuTargetEvent.set(e)
                contextMenuTargetMessage.set(message)
            }
            $isTouchDeviceContextMenuOpen = !$isTouchDeviceContextMenuOpen
        }
    }
</script>

<li id={message.id} class={["w-full", { "ml-auto": isCurrentUser }]}>
    <div
        class="relative grid gap-1.5 px-4 py-2
        {$selectedMessageIds.includes(message.id) && 'bg-blue-400/10'}
        {$selectedMessageIds.length > 0 && 'cursor-pointer'}"
        transition:shrinkHeight={{ duration: 200 }}
        oncontextmenu={(e) => {
            e.preventDefault()
            if ("pointerType" in e && e.pointerType !== "mouse") return
            if (highlight) {
                interval = highlightAnimate(highlight, interval)
            }
            isContextMenuOpen.state = true
            contextMenuTargetEvent.set(e)
            contextMenuTargetMessage.set(message)
        }}
    >
        <div
            bind:this={highlight}
            class="reply-highlight absolute inset-0 -z-1 bg-gray-50/10 opacity-0 duration-200 ease-in-out"
        ></div>

        {#if !isCurrentUser}
            <span class="text-2xs font-semibold text-gray-500 uppercase">
                {message.expand.user.username}
                {message.expand.user.isAdmin ? "- admin" : ""}
            </span>
        {/if}

        <div
            class={[
                "message-content-wrapper relative z-1 max-w-80 rounded bg-gray-700 break-words shadow",
                isCurrentUser ?
                    "justify-self-end rounded-br-[2px] bg-[#7e6dd1]! text-gray-50"
                :   "justify-self-start rounded-tl-[2px]",
            ]}
        >
            {#if message.expand?.repliedTo}
                {@const msg = message.expand?.repliedTo}
                <MessageReplyPreview
                    id={msg.id}
                    username={msg.expand.user.username}
                    content={msg.content}
                />
            {/if}

            <div class="py-2 pr-4 pl-3 select-text" onclick={handleClick}>
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
                class={[
                    "absolute bottom-6 flex text-xl",
                    isCurrentUser ? "left-4" : "right-4",
                ]}
            >
                {#if $selectedMessageIds.includes(message.id)}
                    <IconCheckCircleRegular class="text-green-400" />
                {:else}
                    <IconCircleRegular />
                {/if}
            </div>
        {/if}

        <div class="absolute inset-0" onclick={handleClick}></div>
    </div>
</li>

<style>
    @reference "../../../../app.css";

    /* NOTE: This is for when we add markdown support */
    .message-content-wrapper :global(a) {
        @apply break-all;
    }
</style>

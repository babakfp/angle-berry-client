<script lang="ts">
    import type { SubmitFunction } from "@sveltejs/kit"
    import { page } from "$app/stores"
    import { enhance } from "$app/forms"
    import { writable } from "svelte/store"
    import { messages, unreadMessagesLength } from "$stores/messages"
    import { pb } from "$stores/pb"
    import {
        isReplying,
        replyTargetMessage,
        messageIdToEdit,
        messageInputElement,
        isTouchDeviceContextMenuOpen,
        isContextMenuOpen,
    } from "./chatStores"
    import IconSpinnerDuotone from "phosphor-icons-svelte/IconSpinnerDuotone.svelte"
    import IconCheckDuotone from "phosphor-icons-svelte/IconCheckDuotone.svelte"
    import IconPaperPlaneRightDuotone from "phosphor-icons-svelte/IconPaperPlaneRightDuotone.svelte"
    import PopSide from "$components/PopSide.svelte"
    import Message from "./Message/Message.svelte"
    import MessageActionPreview from "./MessageActionPreview.svelte"
    import ContextMenu from "./ContextMenu.svelte"
    import MessageDeleteModal from "./MessageDeleteModal.svelte"
    import { getTextareaLineCount } from "$utilities/getTextareaLineCount"
    import type {
        ListResult,
        RealtimeMessagesResponse,
    } from "$utilities/pb-types"

    export let isOpen = false
    export let toggleButton: HTMLButtonElement

    messages.set($page.data.messages)

    $: if (!isOpen && $messageIdToEdit) messageIdToEdit.set("")
    $: if (isOpen && $unreadMessagesLength) unreadMessagesLength.set(0)

    const messageInputValue = writable("")

    messageInputValue.subscribe(() => {
        if (!$messageInputElement) return
        $messageInputElement.setAttribute("rows", "1")
        $messageInputElement.value = $messageInputValue
        const lineCount = getTextareaLineCount($messageInputElement)
        $messageInputElement.setAttribute(
            "rows",
            lineCount <= 4 ? String(lineCount) : "4",
        )
    })

    messageIdToEdit.subscribe(id =>
        messageInputValue.set(
            $messages.items
                .filter(msg => msg.id === id)[0]
                ?.content.replaceAll("<br>", "\n") || "",
        ),
    )

    $: isEditingMessage = !!$messageIdToEdit

    let isSendingMessage = false
    const submitMessage: SubmitFunction = () => {
        isSendingMessage = true
        $messageInputElement!.focus()
        return async ({ result, update }) => {
            isSendingMessage = false
            if (result.type === "success") {
                $messageInputElement!.style.height = ""
                isReplying.set(false)
                messageIdToEdit.set("")
                $messageInputElement!.setAttribute("rows", "1")
            }
            update()
        }
    }

    let formElement: HTMLFormElement

    $: replyedMessageId = $isReplying ? $replyTargetMessage?.id : ""

    let isFetchingOlderMessages = false
    let isSomethingWentWrongWhenFetchingOlderMessages = false
    let pageNumberFortheNextOlderMessagesToFetch = 2
    const handleScroll = async (e: Event) => {
        // Is reached the top of the scrollable?
        // Added + 200 to fetch the data earlier for a better UX
        if (
            pageNumberFortheNextOlderMessagesToFetch <=
                $page.data.messages.totalPages &&
            Math.abs((e.target as HTMLOListElement).scrollTop) + 200 >=
                (e.target as HTMLOListElement).scrollHeight -
                    (e.target as HTMLOListElement).clientHeight
        ) {
            try {
                isFetchingOlderMessages = true
                isSomethingWentWrongWhenFetchingOlderMessages = false

                const messagesRecords: ListResult<RealtimeMessagesResponse> =
                    await $pb
                        .collection("messages")
                        .getList(pageNumberFortheNextOlderMessagesToFetch, 50, {
                            sort: "-created",
                            expand: "user,repliedTo,repliedTo.user",
                            filter: `created < "${
                                $messages.items[$messages.items.length - 1]
                                    .created
                            }"`,
                        })
                if (messagesRecords) {
                    messages.update(_messages => ({
                        ..._messages,
                        items: [..._messages.items, ...messagesRecords.items],
                    }))
                    isFetchingOlderMessages = false
                    pageNumberFortheNextOlderMessagesToFetch += 1
                }
            } catch (error) {
                isSomethingWentWrongWhenFetchingOlderMessages = true
                throw error
            }
        }

        if ($isContextMenuOpen || $isTouchDeviceContextMenuOpen) {
            isContextMenuOpen.set(false)
            isTouchDeviceContextMenuOpen.set(false)
        }
    }
</script>

<PopSide bind:isOpen {toggleButton}>
    {#if $messages.items.length > 0}
        <ol
            id="messages-wrapper"
            class="flex flex-col-reverse content-start items-start overflow-y-auto overscroll-y-contain py-4 sm:text-sm"
            on:scroll={handleScroll}
        >
            {#each $messages.items as message (message.id)}
                <Message {message} />
            {/each}
            {#if isFetchingOlderMessages}
                <div class="mx-auto flex items-center gap-2 px-4 text-gray-500">
                    {#if isSomethingWentWrongWhenFetchingOlderMessages}
                        <p>
                            Something went wrong! Maybe refreshing the page can
                            solve the problem.
                        </p>
                        <button type="button">Try again</button>
                    {:else}
                        <p>Fetching older messages</p>
                        <IconSpinnerDuotone class="ml-2 animate-spin text-xl" />
                    {/if}
                </div>
            {/if}
        </ol>
    {:else}
        <p class="px-4 py-6 text-center">No messages found!</p>
    {/if}

    <form
        class="sticky bottom-0 z-1 self-end bg-body-bg
		{isSendingMessage && 'pointer-events-none'}"
        method="post"
        action="/chat"
        use:enhance={submitMessage}
        bind:this={formElement}
    >
        {#if $isReplying}
            <MessageActionPreview
                title="Replying to {$replyTargetMessage?.expand.user.username}"
                content={$replyTargetMessage?.content || ""}
                messageId={$replyTargetMessage?.id || ""}
                on:close={() => isReplying.set(false)}
                bind:isOpen={$isReplying}
            />
        {/if}

        {#if $messageIdToEdit}
            <MessageActionPreview
                title="Editing message"
                content={$messages.items.filter(
                    msg => msg.id === $messageIdToEdit,
                )[0]?.content}
                messageId={$messageIdToEdit}
                on:close={() => messageIdToEdit.set("")}
                bind:isOpen={isEditingMessage}
            />
        {/if}

        <div
            class="relative grid grid-cols-[1fr_auto] border-t border-white/5 shadow-[0_-1px_3px_0_rgb(0_0_0_/_0.1),_0_-1px_2px_-1px_rgb(0_0_0_/_0.1)]"
        >
            <textarea
                class="block w-full resize-none bg-body-bg p-4 outline-inset placeholder:text-gray-500"
                bind:this={$messageInputElement}
                bind:value={$messageInputValue}
                name="messageContent"
                placeholder="Write your message..."
                required
                rows="1"
                autocomplete="off"
                on:keypress={e => {
                    if (
                        !isSendingMessage &&
                        e.ctrlKey &&
                        (e.code === "Enter" || e.key === "Enter")
                    ) {
                        formElement.requestSubmit()
                    }
                }}
            />
            <button
                type="button"
                class="flex items-end outline-inset hover:bg-white/5 hover:text-white
				{isSendingMessage && 'opacity-50'}"
                disabled={isSendingMessage}
            >
                <div class="flex min-h-14 items-center px-4 text-2xl">
                    {#if $messageIdToEdit}
                        <IconCheckDuotone />
                    {:else if isSendingMessage}
                        <IconSpinnerDuotone class="animate-spin" />
                    {:else}
                        <IconPaperPlaneRightDuotone />
                    {/if}
                </div>
            </button>
        </div>
        <input
            type="hidden"
            name="replyedMessageId"
            bind:value={replyedMessageId}
        />
        <input
            type="hidden"
            name="messageIdToEdit"
            bind:value={$messageIdToEdit}
        />
    </form>

    <svelte:fragment slot="outer">
        <ContextMenu />
        <MessageDeleteModal />
    </svelte:fragment>
</PopSide>

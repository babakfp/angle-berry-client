<script lang="ts">
    import type { SubmitFunction } from "@sveltejs/kit"
    import IconCheckRegular from "phosphor-icons-svelte/IconCheckRegular.svelte"
    import IconPaperPlaneRightRegular from "phosphor-icons-svelte/IconPaperPlaneRightRegular.svelte"
    import IconSpinnerRegular from "phosphor-icons-svelte/IconSpinnerRegular.svelte"
    import { untrack } from "svelte"
    import { enhance } from "$app/forms"
    import PopSide from "$lib/components/PopSide.svelte"
    import { messages, unreadMessagesLength } from "$lib/stores/messages.svelte"
    import { pb } from "$lib/stores/pb.svelte"
    import type {
        ListResult,
        RealtimeMessagesResponse,
        UsersResponse,
    } from "$lib/utilities/pb"
    import {
        isContextMenuOpen,
        isReplying,
        isTouchDeviceContextMenuOpen,
        messageIdToEdit,
        messageInputElement,
        replyTargetMessage,
    } from "./chatStates.svelte"
    import ContextMenu from "./ContextMenu.svelte"
    import Message from "./Message/Message.svelte"
    import MessageActionPreview from "./MessageActionPreview.svelte"
    import MessageDeleteModal from "./MessageDeleteModal.svelte"

    let {
        loggedInUser,
        pbMessages,
        isOpen = $bindable(false),
        toggleButton,
    }: {
        loggedInUser: UsersResponse
        pbMessages: ListResult<RealtimeMessagesResponse>
        isOpen?: boolean
        toggleButton: HTMLButtonElement
    } = $props()

    messages._ = pbMessages

    $effect(() => {
        if (!isOpen && messageIdToEdit._) {
            messageIdToEdit._ = undefined
        }
    })
    $effect(() => {
        if (isOpen && unreadMessagesLength._) {
            unreadMessagesLength._ = 0
        }
    })

    let messageInputValue = $state("")

    $effect(() => {
        messageIdToEdit
        untrack(() => {
            if (!messages._) return
            messageInputValue =
                messages._.items
                    .find((msg) => msg.id === messageIdToEdit._)
                    ?.content.replaceAll("<br>", "\n") || ""
        })
    })

    let isEditingMessage = $state(false)

    $effect(() => {
        isEditingMessage = !!messageIdToEdit._
    })

    let isSendingMessage = $state(false)
    const submitMessage: SubmitFunction = () => {
        isSendingMessage = true
        messageInputElement._!.focus()
        return async ({ result, update }) => {
            isSendingMessage = false
            if (result.type === "success") {
                isReplying._ = false
                messageIdToEdit._ = undefined
            }
            update()
        }
    }

    let formElement = $state<HTMLFormElement>()

    let replyedMessageId = $state<string>()
    $effect(() => {
        replyedMessageId = isReplying._ ? replyTargetMessage._?.id : undefined
    })

    let isFetchingOlderMessages = $state(false)
    let isSomethingWentWrongWhenFetchingOlderMessages = $state(false)
    let pageNumberFortheNextOlderMessagesToFetch = 2
    const handleScroll = async (e: Event) => {
        // Is reached the top of the scrollable?
        // Added + 200 to fetch the data earlier for a better UX
        if (
            pageNumberFortheNextOlderMessagesToFetch <= pbMessages.totalPages
            && Math.abs((e.target as HTMLOListElement).scrollTop) + 200
                >= (e.target as HTMLOListElement).scrollHeight
                    - (e.target as HTMLOListElement).clientHeight
        ) {
            try {
                isFetchingOlderMessages = true
                isSomethingWentWrongWhenFetchingOlderMessages = false

                const messagesRecords: ListResult<RealtimeMessagesResponse> =
                    await pb._.collection("messages").getList(
                        pageNumberFortheNextOlderMessagesToFetch,
                        50,
                        {
                            sort: "-created",
                            expand: "user,repliedTo,repliedTo.user",
                            filter: `created < "${
                                messages._?.items[messages._.items.length - 1]
                                    .created
                            }"`,
                        },
                    )
                if (messagesRecords) {
                    if (messages._) {
                        messages._ = {
                            ...messages._,
                            items: [
                                ...messages._.items,
                                ...messagesRecords.items,
                            ],
                        }
                    }

                    isFetchingOlderMessages = false
                    pageNumberFortheNextOlderMessagesToFetch += 1
                }
            } catch (error) {
                isSomethingWentWrongWhenFetchingOlderMessages = true
                throw error
            }
        }

        if (isContextMenuOpen._ || isTouchDeviceContextMenuOpen._) {
            isContextMenuOpen._ = false
            isTouchDeviceContextMenuOpen._ = false
        }
    }
</script>

<PopSide bind:isOpen {toggleButton}>
    {#if messages._ && messages._.items.length}
        <ol
            id="messages-wrapper"
            class="flex flex-col-reverse content-start items-start overflow-y-auto overscroll-y-contain py-4 sm:text-sm"
            onscroll={handleScroll}
        >
            {#each messages._?.items ?? [] as message (message.id)}
                <Message {loggedInUser} {message} />
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
                        <IconSpinnerRegular class="ml-2 animate-spin text-xl" />
                    {/if}
                </div>
            {/if}
        </ol>
    {:else}
        <p class="px-4 py-6 text-center">No messages found!</p>
    {/if}

    <form
        class={[
            "bg-background sticky bottom-0 z-1 self-end",
            { "pointer-events-none": isSendingMessage },
        ]}
        method="post"
        action="/chat"
        use:enhance={submitMessage}
        bind:this={formElement}
    >
        {#if isReplying._}
            <MessageActionPreview
                title="Replying to {replyTargetMessage._?.expand.user.username}"
                content={replyTargetMessage._?.content || ""}
                messageId={replyTargetMessage._?.id || ""}
                onClose={() => (isReplying._ = false)}
                bind:isOpen={isReplying._}
            />
        {/if}

        {#if messageIdToEdit._}
            <MessageActionPreview
                title="Editing message"
                content={messages._?.items.filter(
                    (msg) => msg.id === messageIdToEdit._,
                )[0]?.content ?? ""}
                messageId={messageIdToEdit._}
                onClose={() => (messageIdToEdit._ = undefined)}
                bind:isOpen={isEditingMessage}
            />
        {/if}

        <div
            class="relative grid grid-cols-[1fr_auto] border-t border-gray-50/5 shadow-[0_-1px_3px_0_rgb(0_0_0/0.1),0_-1px_2px_-1px_rgb(0_0_0/0.1)]"
        >
            <textarea
                class="bg-background outline-inset block field-sizing-content max-h-48 w-full resize-none p-4 placeholder:text-gray-500"
                bind:this={messageInputElement._}
                bind:value={messageInputValue}
                name="messageContent"
                placeholder="Write your message..."
                required
                autocomplete="off"
                onkeypress={(e) => {
                    if (
                        !isSendingMessage
                        && e.ctrlKey
                        && (e.code === "Enter" || e.key === "Enter")
                    ) {
                        formElement?.requestSubmit()
                    }
                }}
                oninput={(e) => {
                    messageInputValue = messageInputValue.trimStart()
                }}
            ></textarea>
            <button
                type="submit"
                class={[
                    "outline-inset flex items-end hover:bg-gray-50/5 hover:text-gray-50",
                    { "opacity-50": isSendingMessage },
                ]}
                disabled={isSendingMessage}
            >
                <div class="flex min-h-14 items-center px-4 text-2xl">
                    {#if messageIdToEdit._}
                        <IconCheckRegular />
                    {:else if isSendingMessage}
                        <IconSpinnerRegular class="animate-spin" />
                    {:else}
                        <IconPaperPlaneRightRegular />
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
            bind:value={messageIdToEdit._}
        />
    </form>

    {#snippet outer()}
        <ContextMenu {loggedInUser} />
        <MessageDeleteModal />
    {/snippet}
</PopSide>

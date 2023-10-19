<script>
    import { page } from "$app/stores"
    import { enhance } from "$app/forms"
    import { writable } from "svelte/store"
    import { messages, unreadMessagesLength } from "$stores/messages.js"
    import { pb } from "$stores/pb.js"
    import {
        isReplying,
        replyTargetMessage,
        messageIdToEdit,
        messageInputElement,
    } from "./chatStores.js"
    import IconLoading from "$icons/IconLoading.svelte"
    import IconCheck from "$icons/IconCheck.svelte"
    import IconSend from "$icons/IconSend.svelte"
    import PopSide from "$components/PopSide.svelte"
    import Message from "./Message/Message.svelte"
    import MessageActionPreview from "./MessageActionPreview.svelte"
    import ContextMenu from "./ContextMenu.svelte"
    import MessageDeleteModal from "./MessageDeleteModal.svelte"
    import { getTextareaLineCount } from "$utilities/getTextareaLineCount.js"

    export let isOpen = false
    export let toggleButton

    messages.set($page.data.messages.items || [])

    $: if (!isOpen && $messageIdToEdit) messageIdToEdit.set(null)
    $: if (isOpen && $unreadMessagesLength) unreadMessagesLength.set(0)

    const messageInputValue = writable("")

    messageInputValue.subscribe(() => {
        if (!$messageInputElement) return
        $messageInputElement.setAttribute("rows", 1)
        const lineCount = getTextareaLineCount($messageInputElement)
        $messageInputElement.setAttribute(
            "rows",
            lineCount <= 4 ? lineCount : 4,
        )
    })

    messageIdToEdit.subscribe(id =>
        messageInputValue.set(
            $messages
                .filter(msg => msg.id === id)[0]
                ?.content.replaceAll("<br>", "\n") || "",
        ),
    )

    $: isEditingMessage = !!$messageIdToEdit

    let isSendingMessage = false
    function submitMessage() {
        isSendingMessage = true
        $messageInputElement.focus()
        return async ({ result, update }) => {
            isSendingMessage = false
            if (result.type === "success") {
                $messageInputElement.style.height = null
                isReplying.set(false)
                messageIdToEdit.set(null)
                $messageInputElement.setAttribute("rows", 1)
            }
            update()
        }
    }

    let formElement

    $: replyedMessageId = $isReplying ? $replyTargetMessage.id : ""

    let isFetchingOlderMessages = false
    let isSomethingWentWrongWhenFetchingOlderMessages = false
    let pageNumberFortheNextOlderMessagesToFetch = 2
    const handleScroll = async e => {
        // Is reached the top of the scrollable?
        // Added + 200 to fetch the data earlier for a better UX
        if (
            pageNumberFortheNextOlderMessagesToFetch <=
                $page.data.messages.totalPages &&
            Math.abs(e.target.scrollTop) + 200 >=
                e.target.scrollHeight - e.target.clientHeight
        ) {
            try {
                isFetchingOlderMessages = true
                isSomethingWentWrongWhenFetchingOlderMessages = false

                const messagesRecords = await $pb
                    .collection("messages")
                    .getList(pageNumberFortheNextOlderMessagesToFetch, 50, {
                        sort: "-created",
                        expand: "user,repliedTo,repliedTo.user",
                        filter: `created < "${
                            $messages[$messages.length - 1].created
                        }"`,
                    })
                if (messagesRecords) {
                    messages.update(_messages => [
                        ..._messages,
                        ...messagesRecords.items,
                    ])
                    isFetchingOlderMessages = false
                    pageNumberFortheNextOlderMessagesToFetch += 1
                }
            } catch (error) {
                isSomethingWentWrongWhenFetchingOlderMessages = true
                throw error
            }
        }
    }
</script>

<PopSide bind:isOpen {toggleButton}>
    {#if $messages.length > 0}
        <ol
            id="messages-wrapper"
            class="flex flex-col-reverse content-start items-start overflow-y-auto overscroll-y-contain py-4 sm:text-sm"
            on:scroll={handleScroll}
        >
            {#each $messages as message (message.id)}
                <Message {message} />
            {/each}
            {#if isFetchingOlderMessages}
                <div class="mx-auto flex items-center gap-2 px-4 text-gray-500">
                    {#if isSomethingWentWrongWhenFetchingOlderMessages}
                        <p>
                            Something went wrong! Maybe refreshing the page can
                            solve the problem.
                        </p>
                        <button>Try again</button>
                    {:else}
                        <IconLoading class="text-xl" />
                        <p>Fetching older messages...</p>
                    {/if}
                </div>
            {/if}
        </ol>
    {:else}
        <p class="px-4 py-6 text-center">No messages found!</p>
    {/if}

    <form
        class="sticky bottom-0 self-end
		{isSendingMessage && 'pointer-events-none'}
		"
        method="POST"
        action="/chat"
        use:enhance={submitMessage}
        bind:this={formElement}
    >
        {#if $isReplying}
            <MessageActionPreview
                title="Replying to {$replyTargetMessage.expand.user.username}"
                content={$replyTargetMessage.content}
                messageId={$replyTargetMessage.id}
                on:close={() => isReplying.set(false)}
                bind:isOpen={$isReplying}
            />
        {/if}

        {#if $messageIdToEdit}
            <MessageActionPreview
                title="Editing message"
                content={$messages.filter(msg => msg.id === $messageIdToEdit)[0]
                    ?.content}
                messageId={$messageIdToEdit}
                on:close={() => messageIdToEdit.set(null)}
                bind:isOpen={isEditingMessage}
            />
        {/if}

        <div
            class="relative grid grid-cols-[1fr_auto] border-t border-white/5 shadow-[0_-1px_3px_0_rgb(0_0_0_/_0.1),_0_-1px_2px_-1px_rgb(0_0_0_/_0.1)]"
        >
            <textarea
                class="block w-full resize-none bg-gray-800 p-4 outline-inset placeholder:text-gray-500"
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
                class="flex items-end outline-inset hover:bg-white/5 hover:text-white
				{isSendingMessage && 'opacity-50'}"
                disabled={isSendingMessage}
            >
                <div class="flex min-h-14 items-center px-4 text-2xl">
                    {#if $messageIdToEdit}
                        <IconCheck />
                    {:else if isSendingMessage}
                        <IconLoading />
                    {:else}
                        <IconSend />
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

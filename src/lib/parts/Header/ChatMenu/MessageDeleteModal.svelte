<script>
    import { pb } from "$stores/pb.js"
    import { messages } from "$stores/messages.js"
    import {
        contextMenuTargetMessage,
        messageIdsToDelete,
        messageIdToEdit,
        isReplying,
    } from "./chatStores.js"
    import IconLoading from "$icons/IconLoading.svelte"
    import Modal from "$components/Modal.svelte"

    let isDeletingMessage = false
    $: isDeletePopupOpen = !!$messageIdsToDelete.length
    $: if (!isDeletePopupOpen && $messageIdsToDelete.length > 0)
        messageIdsToDelete.set([])

    async function handleDelete() {
        try {
            const isMessageDeleted = await Promise.all(
                $messageIdsToDelete.map(messageId =>
                    $pb.collection("messages").delete(messageId),
                ),
            )

            isDeletingMessage = true

            if (isMessageDeleted) {
                isDeletingMessage = false
                messageIdsToDelete.set([])
                messageIdToEdit.set(null)
                isReplying.set(false)

                // Remove other messages reply preview to that deleted message
                messages.update(msgs =>
                    msgs.map(msg => {
                        if (
                            msg.repliedTo &&
                            msg.repliedTo === $contextMenuTargetMessage?.id
                        ) {
                            msg.repliedTo = ""
                            msg.expand.repliedTo = null
                        }
                        return msg
                    }),
                )
            }
        } catch (error) {
            console.error(error)
            isDeletingMessage = false
            messageIdsToDelete.set([])
            messageIdToEdit.set(null)
            isReplying.set(false)
        }
    }
</script>

<Modal bind:isOpen={isDeletePopupOpen}>
    <h6 class="text-lg">Delete message</h6>
    <p>Are you sure you want to delete this message?</p>
    <div class="mt-4 flex justify-end gap-2">
        <button
            class="btn btn-gray"
            on:click={() => {
                messageIdsToDelete.set([])
            }}
        >
            Cancel
        </button>
        <button
            class="btn btn-danger
			{isDeletingMessage && 'pointer-events-none opacity-50'}"
            disabled={isDeletingMessage}
            on:click={handleDelete}
        >
            {#if isDeletingMessage}
                <IconLoading />
            {:else}
                Delete
            {/if}
        </button>
    </div>
</Modal>

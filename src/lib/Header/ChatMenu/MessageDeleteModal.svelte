<script>
    import { pb } from "$stores/pb.js"
    import { messages } from "$stores/messages.js"
    import {
        contextMenuTargetMessage,
        messageIdToDelete,
        messageIdToEdit,
        isReplying,
    } from "./chatStores.js"
    import IconLoading from "$icons/IconLoading.svelte"
    import Modal from "$lib/Modal.svelte"

    let isDeletingMessage = false
    $: isDeletePopupOpen = !!$messageIdToDelete
    $: if (!isDeletePopupOpen && $messageIdToDelete) messageIdToDelete.set(null)
</script>

<Modal bind:isOpen={isDeletePopupOpen}>
    <h3>Are you sure you want to delete this message?</h3>
    <div class="mt-4 flex justify-end gap-2">
        <button
            class="btn btn-gray"
            on:click={() => {
                messageIdToDelete.set(null)
            }}
        >
            Cancel
        </button>
        <button
            class="btn btn-danger
			{isDeletingMessage && 'pointer-events-none opacity-50'}"
            disabled={isDeletingMessage}
            on:click={async () => {
                try {
                    const isMessageDeleted = await $pb
                        .collection("messages")
                        .delete($messageIdToDelete)

                    isDeletingMessage = true
                    if (isMessageDeleted) {
                        isDeletingMessage = false
                        messageIdToDelete.set(null)
                        messageIdToEdit.set(null)
                        isReplying.set(false)

                        // Remove other messages reply preview to that deleted message
                        messages.update(msgs =>
                            msgs.map(msg => {
                                if (
                                    msg.repliedTo &&
                                    msg.repliedTo ===
                                        $contextMenuTargetMessage.id
                                ) {
                                    msg.repliedTo = ""
                                    msg.expand.repliedTo = null
                                }
                                return msg
                            })
                        )
                    }
                } catch (error) {
                    console.error(error)
                    isDeletingMessage = false
                    messageIdToDelete.set(null)
                    messageIdToEdit.set(null)
                    isReplying.set(false)
                }
            }}
        >
            {#if isDeletingMessage}
                <IconLoading />
            {:else}
                Delete
            {/if}
        </button>
    </div>
</Modal>

<script lang="ts">
    import IconSpinnerRegular from "phosphor-icons-svelte/IconSpinnerRegular.svelte"
    import Modal from "$lib/components/Modal.svelte"
    import { messages } from "$lib/stores/messages"
    import { pb } from "$lib/stores/pb"
    import {
        contextMenuTargetMessage,
        isReplying,
        messageIdsToDelete,
        messageIdToEdit,
        selectedMessageIds,
    } from "./chatStores"

    let isDeletingMessage = false
    $: isDeletePopupOpen = !!$messageIdsToDelete.length
    $: if (!isDeletePopupOpen && $messageIdsToDelete.length > 0)
        messageIdsToDelete.set([])

    const handleDelete = async () => {
        try {
            const isMessageDeleted = await Promise.all(
                $messageIdsToDelete.map((messageId) =>
                    $pb.collection("messages").delete(messageId),
                ),
            )

            isDeletingMessage = true

            if (isMessageDeleted) {
                isDeletingMessage = false
                messageIdsToDelete.set([])
                selectedMessageIds.set([])
                messageIdToEdit.set(undefined)
                isReplying.set(false)

                // Remove other messages reply preview to that deleted message
                messages.update((messages_) => {
                    messages_.items = messages_.items.map((msg) => {
                        if (
                            msg.repliedTo &&
                            msg.repliedTo === $contextMenuTargetMessage?.id
                        ) {
                            msg.repliedTo = ""
                            msg.expand.repliedTo = undefined
                        }
                        return msg
                    })
                    return messages_
                })
            }
        } catch (error) {
            console.error(error)
            isDeletingMessage = false
            messageIdsToDelete.set([])
            messageIdToEdit.set(undefined)
            isReplying.set(false)
        }
    }
</script>

<Modal
    title="Delete message"
    description="Are you sure you want to delete this message?"
    bind:isOpen={isDeletePopupOpen}
>
    <svelte:fragment slot="actions">
        <button
            type="button"
            class="btn btn-gray"
            on:click={() => messageIdsToDelete.set([])}
        >
            Cancel
        </button>
        <button
            type="button"
            class="btn btn-danger {isDeletingMessage &&
                'pointer-events-none opacity-50'}"
            disabled={isDeletingMessage}
            on:click={handleDelete}
        >
            <span>{isDeletingMessage ? "Deleting" : "Delete"}</span>
            {#if isDeletingMessage}
                <IconSpinnerRegular class="ml-2 animate-spin" />
            {/if}
        </button>
    </svelte:fragment>
</Modal>

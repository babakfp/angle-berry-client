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
    } from "./chatStores.svelte"

    let isDeletingMessage = $state(false)
    let isDeletePopupOpen = $state(false)
    $effect(() => {
        isDeletePopupOpen = !!messageIdsToDelete.state.length
    })
    $effect(() => {
        if (!isDeletePopupOpen && messageIdsToDelete.state.length > 0)
            messageIdsToDelete.state = []
    })

    const handleDelete = async () => {
        try {
            const isMessageDeleted = await Promise.all(
                messageIdsToDelete.state.map((messageId) =>
                    $pb.collection("messages").delete(messageId),
                ),
            )

            isDeletingMessage = true

            if (isMessageDeleted) {
                isDeletingMessage = false
                messageIdsToDelete.state = []
                selectedMessageIds.state = []
                messageIdToEdit.state = undefined
                isReplying.state = false

                // Remove other messages reply preview to that deleted message
                messages.update((messages_) => {
                    messages_.items = messages_.items.map((msg) => {
                        if (
                            msg.repliedTo
                            && msg.repliedTo
                                === contextMenuTargetMessage.state?.id
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
            messageIdsToDelete.state = []
            messageIdToEdit.state = undefined
            isReplying.state = false
        }
    }
</script>

<Modal
    title="Delete message"
    description="Are you sure you want to delete this message?"
    bind:isOpen={isDeletePopupOpen}
>
    {#snippet actions()}
        <button
            type="button"
            class="btn btn-gray"
            onclick={() => (messageIdsToDelete.state = [])}
        >
            Cancel
        </button>
        <button
            type="button"
            class={[
                "btn btn-danger",
                { "pointer-events-none opacity-50": isDeletingMessage },
            ]}
            disabled={isDeletingMessage}
            onclick={handleDelete}
        >
            <span>{isDeletingMessage ? "Deleting" : "Delete"}</span>
            {#if isDeletingMessage}
                <IconSpinnerRegular class="ml-2 animate-spin" />
            {/if}
        </button>
    {/snippet}
</Modal>

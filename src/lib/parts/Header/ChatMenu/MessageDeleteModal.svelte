<script lang="ts">
    import IconSpinnerRegular from "phosphor-icons-svelte/IconSpinnerRegular.svelte"
    import Modal from "$lib/components/Modal.svelte"
    import { messages } from "$lib/stores/messages.svelte"
    import { pb } from "$lib/stores/pb.svelte"
    import {
        contextMenuTargetMessage,
        isReplying,
        messageIdsToDelete,
        messageIdToEdit,
        selectedMessageIds,
    } from "./chatStates.svelte"

    let isDeletingMessage = $state(false)
    let isDeletePopupOpen = $state(false)
    $effect(() => {
        isDeletePopupOpen = !!messageIdsToDelete._.length
    })
    $effect(() => {
        if (!isDeletePopupOpen && messageIdsToDelete._.length > 0)
            messageIdsToDelete._ = []
    })

    const handleDelete = async () => {
        try {
            const isMessageDeleted = await Promise.all(
                messageIdsToDelete._.map((messageId) =>
                    pb._.collection("messages").delete(messageId),
                ),
            )

            isDeletingMessage = true

            if (isMessageDeleted) {
                isDeletingMessage = false
                messageIdsToDelete._ = []
                selectedMessageIds._ = []
                messageIdToEdit._ = undefined
                isReplying._ = false

                // Remove other messages reply preview to that deleted message
                if (messages._) {
                    messages._.items = messages._.items.map((msg) => {
                        if (
                            msg.repliedTo
                            && msg.repliedTo === contextMenuTargetMessage._?.id
                        ) {
                            msg.repliedTo = ""
                            msg.expand.repliedTo = undefined
                        }
                        return msg
                    })
                }
            }
        } catch (error) {
            console.error(error)
            isDeletingMessage = false
            messageIdsToDelete._ = []
            messageIdToEdit._ = undefined
            isReplying._ = false
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
            onclick={() => (messageIdsToDelete._ = [])}
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

<script lang="ts">
    import IconArrowUUpLeftRegular from "phosphor-icons-svelte/IconArrowUUpLeftRegular.svelte"
    import IconCheckCircleRegular from "phosphor-icons-svelte/IconCheckCircleRegular.svelte"
    import IconCheckRegular from "phosphor-icons-svelte/IconCheckRegular.svelte"
    import IconCopySimpleRegular from "phosphor-icons-svelte/IconCopySimpleRegular.svelte"
    import IconPencilSimpleRegular from "phosphor-icons-svelte/IconPencilSimpleRegular.svelte"
    import IconTrashSimpleRegular from "phosphor-icons-svelte/IconTrashSimpleRegular.svelte"
    import { copyText } from "svelte-copy"
    import { OutClick } from "svelte-outclick"
    import { messages } from "$lib/stores/messages"
    import type { UsersResponse } from "$lib/utilities/pb"
    import {
        contextMenuTargetMessage,
        isContextMenuOpen,
        isReplying,
        messageIdsToDelete,
        messageIdToEdit,
        messageInputElement,
        replyTargetMessage,
        selectedMessageIds,
    } from "./chatStores.svelte"
    import MessageContextMenu from "./MessageContextMenu.svelte"
    import MessageContextMenuItem from "./MessageContextMenuItem.svelte"

    let {
        loggedInUser,
    }: {
        loggedInUser: UsersResponse
    } = $props()

    let copyTimeoutId = $state<number>()

    const replyMessage = () => {
        isContextMenuOpen.state = false
        isReplying.state = true
        replyTargetMessage.state = contextMenuTargetMessage.state
        messageIdToEdit.state = undefined
        if (messageInputElement.state) messageInputElement.state.focus()
    }

    const editMessage = () => {
        if (!contextMenuTargetMessage.state) return
        isContextMenuOpen.state = false
        messageIdToEdit.state = contextMenuTargetMessage.state.id
        isReplying.state = false
        if (messageInputElement.state) messageInputElement.state.focus()
    }

    const copyMessage = () => {
        if (selectedMessageIds.state.length > 0) {
            let copiedText = ""
            const selectedMessages = $messages.items
                .filter((msg) => selectedMessageIds.state.includes(msg.id))
                .sort(
                    (a, b) =>
                        new Date(a.created).getTime()
                        - new Date(b.created).getTime(),
                )
            selectedMessages.forEach((msg, i) => {
                copiedText += msg.expand.user.username + "\n"
                copiedText += msg.content
                if (i < selectedMessages.length - 1) {
                    copiedText += "<br><br>---<br><br>"
                } else {
                    copiedText += "<br><br>"
                }
            })
            copyText(copiedText.replaceAll("<br>", "\n"))
        } else {
            if (!contextMenuTargetMessage.state) return
            copyText(
                contextMenuTargetMessage.state.content.replaceAll("<br>", "\n"),
            )
        }
        copyTimeoutId = setTimeout(() => {
            isContextMenuOpen.state = false
            copyTimeoutId = undefined
        }, 1000)
    }

    const setSelectedMessagesForDeletion = () => {
        isContextMenuOpen.state = false
        messageIdsToDelete.state = selectedMessageIds.state
    }

    const setAMessageForDeletion = () => {
        if (!contextMenuTargetMessage.state) return
        isContextMenuOpen.state = false
        messageIdsToDelete.state = [contextMenuTargetMessage.state.id]
    }

    const selectMessage = () => {
        if (!contextMenuTargetMessage.state) return
        isContextMenuOpen.state = false
        selectedMessageIds.state = [
            ...selectedMessageIds.state,
            contextMenuTargetMessage.state.id,
        ]
    }

    const clearSelection = () => {
        isContextMenuOpen.state = false
        selectedMessageIds.state = []
    }
</script>

<svelte:window
    onkeydown={(e) => {
        if (e.key === "Escape") {
            isContextMenuOpen.state = false
        }
    }}
/>
<svelte:document
    onmouseleave={() => {
        isContextMenuOpen.state = false
    }}
/>

<OutClick
    onOutClick={() => {
        if (!isContextMenuOpen.state) return
        isContextMenuOpen.state = false
    }}
    excludeQuerySelectorAll=".MessageContextMenu"
>
    <MessageContextMenu>
        {#if !selectedMessageIds.state.length || (contextMenuTargetMessage.state && !selectedMessageIds.state.includes(contextMenuTargetMessage.state?.id))}
            <MessageContextMenuItem
                title="Reply"
                icon={IconArrowUUpLeftRegular}
                onclick={replyMessage}
            />
        {/if}
        {#if contextMenuTargetMessage.state?.expand.user.id === loggedInUser.id && !selectedMessageIds.state.length}
            <MessageContextMenuItem
                title="Edit"
                icon={IconPencilSimpleRegular}
                onclick={editMessage}
            />
        {/if}
        {#if selectedMessageIds.state.length}
            {#if contextMenuTargetMessage.state && selectedMessageIds.state.includes(contextMenuTargetMessage.state?.id)}
                <MessageContextMenuItem
                    title={copyTimeoutId ? "Copied" : "Copy Selected as Text"}
                    icon={copyTimeoutId ? IconCheckRegular : (
                        IconCopySimpleRegular
                    )}
                    isDisabled={!!copyTimeoutId}
                    onclick={copyMessage}
                />
            {/if}
        {:else}
            <MessageContextMenuItem
                title={copyTimeoutId ? "Copied" : "Copy Text"}
                icon={copyTimeoutId ? IconCheckRegular : IconCopySimpleRegular}
                isDisabled={!!copyTimeoutId}
                onclick={copyMessage}
            />
        {/if}
        {#if contextMenuTargetMessage.state?.expand.user.id === loggedInUser.id}
            {#if selectedMessageIds.state.length > 0}
                {#if contextMenuTargetMessage.state && selectedMessageIds.state.includes(contextMenuTargetMessage.state?.id)}
                    <MessageContextMenuItem
                        title="Delete Selected"
                        icon={IconTrashSimpleRegular}
                        onclick={setSelectedMessagesForDeletion}
                    />
                {/if}
            {:else}
                <MessageContextMenuItem
                    title="Delete"
                    icon={IconTrashSimpleRegular}
                    onclick={setAMessageForDeletion}
                />
            {/if}
        {/if}
        {#if !selectedMessageIds.state.includes(contextMenuTargetMessage.state?.id || "")}
            <MessageContextMenuItem
                title="Select"
                icon={IconCheckCircleRegular}
                onclick={selectMessage}
            />
        {:else}
            <MessageContextMenuItem
                title="Clear Selection"
                icon={IconCheckCircleRegular}
                onclick={clearSelection}
            />
        {/if}
    </MessageContextMenu>
</OutClick>

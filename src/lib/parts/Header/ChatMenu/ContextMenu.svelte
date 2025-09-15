<script lang="ts">
    import IconArrowUUpLeftRegular from "phosphor-icons-svelte/IconArrowUUpLeftRegular.svelte"
    import IconCheckCircleRegular from "phosphor-icons-svelte/IconCheckCircleRegular.svelte"
    import IconCheckRegular from "phosphor-icons-svelte/IconCheckRegular.svelte"
    import IconCopySimpleRegular from "phosphor-icons-svelte/IconCopySimpleRegular.svelte"
    import IconPencilSimpleRegular from "phosphor-icons-svelte/IconPencilSimpleRegular.svelte"
    import IconTrashSimpleRegular from "phosphor-icons-svelte/IconTrashSimpleRegular.svelte"
    import { copyText } from "svelte-copy"
    import { OutClick } from "svelte-outclick"
    import { messages } from "$lib/stores/messages.svelte"
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
    } from "./chatStates.svelte"
    import MessageContextMenu from "./MessageContextMenu.svelte"
    import MessageContextMenuItem from "./MessageContextMenuItem.svelte"

    let {
        loggedInUser,
    }: {
        loggedInUser: UsersResponse
    } = $props()

    let copyTimeoutId = $state<NodeJS.Timeout>()

    const replyMessage = () => {
        isContextMenuOpen._ = false
        isReplying._ = true
        replyTargetMessage._ = contextMenuTargetMessage._
        messageIdToEdit._ = undefined
        if (messageInputElement._) messageInputElement._.focus()
    }

    const editMessage = () => {
        if (!contextMenuTargetMessage._) return
        isContextMenuOpen._ = false
        messageIdToEdit._ = contextMenuTargetMessage._.id
        isReplying._ = false
        if (messageInputElement._) messageInputElement._.focus()
    }

    const copyMessage = () => {
        if (!messages._) return
        if (selectedMessageIds._.length) {
            let copiedText = ""
            const selectedMessages = messages._.items
                .filter((msg) => selectedMessageIds._.includes(msg.id))
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
            if (!contextMenuTargetMessage._) return
            copyText(
                contextMenuTargetMessage._.content.replaceAll("<br>", "\n"),
            )
        }
        copyTimeoutId = setTimeout(() => {
            isContextMenuOpen._ = false
            copyTimeoutId = undefined
        }, 1000)
    }

    const setSelectedMessagesForDeletion = () => {
        isContextMenuOpen._ = false
        messageIdsToDelete._ = selectedMessageIds._
    }

    const setAMessageForDeletion = () => {
        if (!contextMenuTargetMessage._) return
        isContextMenuOpen._ = false
        messageIdsToDelete._ = [contextMenuTargetMessage._.id]
    }

    const selectMessage = () => {
        if (!contextMenuTargetMessage._) return
        isContextMenuOpen._ = false
        selectedMessageIds._ = [
            ...selectedMessageIds._,
            contextMenuTargetMessage._.id,
        ]
    }

    const clearSelection = () => {
        isContextMenuOpen._ = false
        selectedMessageIds._ = []
    }
</script>

<svelte:window
    onkeydown={(e) => {
        if (e.key === "Escape") {
            isContextMenuOpen._ = false
        }
    }}
/>
<svelte:document
    onmouseleave={() => {
        isContextMenuOpen._ = false
    }}
/>

<OutClick
    onOutClick={() => {
        if (!isContextMenuOpen._) return
        isContextMenuOpen._ = false
    }}
    excludeQuerySelectorAll=".MessageContextMenu"
>
    <MessageContextMenu>
        {#if !selectedMessageIds._.length || (contextMenuTargetMessage._ && !selectedMessageIds._.includes(contextMenuTargetMessage._?.id))}
            <MessageContextMenuItem
                title="Reply"
                icon={IconArrowUUpLeftRegular}
                onclick={replyMessage}
            />
        {/if}
        {#if contextMenuTargetMessage._?.expand.user.id === loggedInUser.id && !selectedMessageIds._.length}
            <MessageContextMenuItem
                title="Edit"
                icon={IconPencilSimpleRegular}
                onclick={editMessage}
            />
        {/if}
        {#if selectedMessageIds._.length}
            {#if contextMenuTargetMessage._ && selectedMessageIds._.includes(contextMenuTargetMessage._?.id)}
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
        {#if contextMenuTargetMessage._?.expand.user.id === loggedInUser.id}
            {#if selectedMessageIds._.length}
                {#if contextMenuTargetMessage._ && selectedMessageIds._.includes(contextMenuTargetMessage._?.id)}
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
        {#if !selectedMessageIds._.includes(contextMenuTargetMessage._?.id || "")}
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

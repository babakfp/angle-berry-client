<script lang="ts">
    import { page } from "$app/stores"
    import { copyText } from "svelte-copy"
    import OutClick from "svelte-outclick"
    import {
        isContextMenuOpen,
        contextMenuTargetMessage,
        isReplying,
        replyTargetMessage,
        messageIdsToDelete,
        messageIdToEdit,
        messageInputElement,
        selectedMessageIds,
    } from "./chatStores"
    import { messages } from "$stores/messages"
    import IconReply from "$icons/IconReply.svelte"
    import IconPen from "$icons/IconPen.svelte"
    import IconClipboard from "$icons/IconClipboard.svelte"
    import IconTrash from "$icons/IconTrash.svelte"
    import IconCheckCircle from "$icons/IconCheckCircle.svelte"
    import MessageContextMenu from "./MessageContextMenu.svelte"
    import MessageContextMenuItem from "./MessageContextMenuItem.svelte"

    let copyTimeoutId: number | undefined

    function replyMessage() {
        isContextMenuOpen.set(false)
        isReplying.set(true)
        replyTargetMessage.set($contextMenuTargetMessage)
        messageIdToEdit.set("")
        if ($messageInputElement) $messageInputElement.focus()
    }

    function editMessage() {
        isContextMenuOpen.set(false)
        messageIdToEdit.set($contextMenuTargetMessage!?.id)
        isReplying.set(false)
        if ($messageInputElement) $messageInputElement.focus()
    }

    function copyMessage() {
        if ($selectedMessageIds.length > 0) {
            let copiedText = ""
            const selectedMessages = $messages.items
                .filter(msg => $selectedMessageIds.includes(msg.id))
                .sort(
                    (a, b) =>
                        new Date(a.created).getTime() -
                        new Date(b.created).getTime(),
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
            copyText(
                $contextMenuTargetMessage!?.content.replaceAll("<br>", "\n"),
            )
        }
        copyTimeoutId = setTimeout(() => {
            isContextMenuOpen.set(false)
            copyTimeoutId = undefined
        }, 1000)
    }

    function deleteMessage() {
        isContextMenuOpen.set(false)
        if ($selectedMessageIds.length > 0) {
            messageIdsToDelete.set($selectedMessageIds)
        } else {
            messageIdsToDelete.set([$contextMenuTargetMessage!?.id])
        }
    }

    function selectMessage() {
        isContextMenuOpen.set(false)
        selectedMessageIds.update(currentValue => [
            ...currentValue,
            $contextMenuTargetMessage!?.id,
        ])
    }

    function clearSelection() {
        isContextMenuOpen.set(false)
        selectedMessageIds.set([])
    }
</script>

<OutClick
    on:outclick={() => $isContextMenuOpen && isContextMenuOpen.set(false)}
    excludeQuerySelectorAll=".MessageContextMenu"
>
    <MessageContextMenu>
        {#if !$selectedMessageIds.length}
            <MessageContextMenuItem
                title="Reply"
                icon={IconReply}
                on:click={replyMessage}
            />
        {/if}
        {#if $contextMenuTargetMessage?.expand.user.id === $page.data.user.id && !$selectedMessageIds.length}
            <MessageContextMenuItem
                title="Edit"
                icon={IconPen}
                on:click={editMessage}
            />
        {/if}
        <MessageContextMenuItem
            title={copyTimeoutId
                ? "Copied"
                : $selectedMessageIds.length
                ? "Copy Selected as Text"
                : "Copy Text"}
            icon={IconClipboard}
            isDisabled={!!copyTimeoutId}
            on:click={copyMessage}
        />
        {#if $contextMenuTargetMessage?.expand.user.id === $page.data.user.id}
            {#if $selectedMessageIds.length > 0}
                <MessageContextMenuItem
                    title="Delete Selected"
                    icon={IconTrash}
                    on:click={deleteMessage}
                />
            {:else}
                <MessageContextMenuItem
                    title="Delete"
                    icon={IconTrash}
                    on:click={deleteMessage}
                />
            {/if}
        {/if}
        {#if !$selectedMessageIds.includes($contextMenuTargetMessage?.id)}
            <MessageContextMenuItem
                title="Select"
                icon={IconCheckCircle}
                on:click={selectMessage}
            />
        {:else}
            <MessageContextMenuItem
                title="Clear Selection"
                icon={IconCheckCircle}
                on:click={clearSelection}
            />
        {/if}
    </MessageContextMenu>
</OutClick>

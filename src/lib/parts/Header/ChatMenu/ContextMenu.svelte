<script lang="ts">
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
    import { messages } from "@/lib/stores/messages"
    import IconArrowUUpLeftRegular from "phosphor-icons-svelte/IconArrowUUpLeftRegular.svelte"
    import IconPencilSimpleRegular from "phosphor-icons-svelte/IconPencilSimpleRegular.svelte"
    import IconCopySimpleRegular from "phosphor-icons-svelte/IconCopySimpleRegular.svelte"
    import IconTrashSimpleRegular from "phosphor-icons-svelte/IconTrashSimpleRegular.svelte"
    import IconCheckCircleRegular from "phosphor-icons-svelte/IconCheckCircleRegular.svelte"
    import IconCheckRegular from "phosphor-icons-svelte/IconCheckRegular.svelte"
    import MessageContextMenu from "./MessageContextMenu.svelte"
    import MessageContextMenuItem from "./MessageContextMenuItem.svelte"
    import type { UsersResponse } from "@/lib/utilities/pb/types"

    export let user: UsersResponse

    let copyTimeoutId: number | undefined

    const replyMessage = () => {
        isContextMenuOpen.set(false)
        isReplying.set(true)
        replyTargetMessage.set($contextMenuTargetMessage)
        messageIdToEdit.set(undefined)
        if ($messageInputElement) $messageInputElement.focus()
    }

    const editMessage = () => {
        if (!$contextMenuTargetMessage) return
        isContextMenuOpen.set(false)
        messageIdToEdit.set($contextMenuTargetMessage.id)
        isReplying.set(false)
        if ($messageInputElement) $messageInputElement.focus()
    }

    const copyMessage = () => {
        if ($selectedMessageIds.length > 0) {
            let copiedText = ""
            const selectedMessages = $messages.items
                .filter((msg) => $selectedMessageIds.includes(msg.id))
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
            if (!$contextMenuTargetMessage) return
            copyText($contextMenuTargetMessage.content.replaceAll("<br>", "\n"))
        }
        copyTimeoutId = setTimeout(() => {
            isContextMenuOpen.set(false)
            copyTimeoutId = undefined
        }, 1000)
    }

    const setSelectedMessagesForDeletion = () => {
        isContextMenuOpen.set(false)
        messageIdsToDelete.set($selectedMessageIds)
    }

    const setAMessageForDeletion = () => {
        if (!$contextMenuTargetMessage) return
        isContextMenuOpen.set(false)
        messageIdsToDelete.set([$contextMenuTargetMessage.id])
    }

    const selectMessage = () => {
        if (!$contextMenuTargetMessage) return
        isContextMenuOpen.set(false)
        $selectedMessageIds = [
            ...$selectedMessageIds,
            $contextMenuTargetMessage.id,
        ]
    }

    const clearSelection = () => {
        isContextMenuOpen.set(false)
        selectedMessageIds.set([])
    }
</script>

<svelte:window
    on:keydown={(e) => {
        if (e.key === "Escape") {
            $isContextMenuOpen = false
        }
    }}
/>
<svelte:document on:mouseleave={() => ($isContextMenuOpen = false)} />

<OutClick
    on:outclick={() => $isContextMenuOpen && isContextMenuOpen.set(false)}
    excludeQuerySelectorAll=".MessageContextMenu"
>
    <MessageContextMenu>
        {#if !$selectedMessageIds.length || ($contextMenuTargetMessage && !$selectedMessageIds.includes($contextMenuTargetMessage?.id))}
            <MessageContextMenuItem
                title="Reply"
                icon={IconArrowUUpLeftRegular}
                on:click={replyMessage}
            />
        {/if}
        {#if $contextMenuTargetMessage?.expand.user.id === user.id && !$selectedMessageIds.length}
            <MessageContextMenuItem
                title="Edit"
                icon={IconPencilSimpleRegular}
                on:click={editMessage}
            />
        {/if}
        {#if $selectedMessageIds.length}
            {#if $contextMenuTargetMessage && $selectedMessageIds.includes($contextMenuTargetMessage?.id)}
                <MessageContextMenuItem
                    title={copyTimeoutId ? "Copied" : "Copy Selected as Text"}
                    icon={copyTimeoutId
                        ? IconCheckRegular
                        : IconCopySimpleRegular}
                    isDisabled={!!copyTimeoutId}
                    on:click={copyMessage}
                />
            {/if}
        {:else}
            <MessageContextMenuItem
                title={copyTimeoutId ? "Copied" : "Copy Text"}
                icon={copyTimeoutId ? IconCheckRegular : IconCopySimpleRegular}
                isDisabled={!!copyTimeoutId}
                on:click={copyMessage}
            />
        {/if}
        {#if $contextMenuTargetMessage?.expand.user.id === user.id}
            {#if $selectedMessageIds.length > 0}
                {#if $contextMenuTargetMessage && $selectedMessageIds.includes($contextMenuTargetMessage?.id)}
                    <MessageContextMenuItem
                        title="Delete Selected"
                        icon={IconTrashSimpleRegular}
                        on:click={setSelectedMessagesForDeletion}
                    />
                {/if}
            {:else}
                <MessageContextMenuItem
                    title="Delete"
                    icon={IconTrashSimpleRegular}
                    on:click={setAMessageForDeletion}
                />
            {/if}
        {/if}
        {#if !$selectedMessageIds.includes($contextMenuTargetMessage?.id || "")}
            <MessageContextMenuItem
                title="Select"
                icon={IconCheckCircleRegular}
                on:click={selectMessage}
            />
        {:else}
            <MessageContextMenuItem
                title="Clear Selection"
                icon={IconCheckCircleRegular}
                on:click={clearSelection}
            />
        {/if}
    </MessageContextMenu>
</OutClick>

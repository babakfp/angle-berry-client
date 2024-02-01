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
    import IconArrowUUpLeftDuotone from "phosphor-icons-svelte/IconArrowUUpLeftDuotone.svelte"
    import IconPencilSimpleDuotone from "phosphor-icons-svelte/IconPencilSimpleDuotone.svelte"
    import IconCopySimpleDuotone from "phosphor-icons-svelte/IconCopySimpleDuotone.svelte"
    import IconTrashSimpleDuotone from "phosphor-icons-svelte/IconTrashSimpleDuotone.svelte"
    import IconCheckCircleDuotone from "phosphor-icons-svelte/IconCheckCircleDuotone.svelte"
    import IconCheckDuotone from "phosphor-icons-svelte/IconCheckDuotone.svelte"
    import MessageContextMenu from "./MessageContextMenu.svelte"
    import MessageContextMenuItem from "./MessageContextMenuItem.svelte"

    let copyTimeoutId: number | undefined

    const replyMessage = () => {
        isContextMenuOpen.set(false)
        isReplying.set(true)
        replyTargetMessage.set($contextMenuTargetMessage)
        messageIdToEdit.set("")
        if ($messageInputElement) $messageInputElement.focus()
    }

    const editMessage = () => {
        isContextMenuOpen.set(false)
        messageIdToEdit.set($contextMenuTargetMessage!?.id)
        isReplying.set(false)
        if ($messageInputElement) $messageInputElement.focus()
    }

    const copyMessage = () => {
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

    const setSelectedMessagesForDeletion = () => {
        isContextMenuOpen.set(false)
        messageIdsToDelete.set($selectedMessageIds)
    }

    const setAMessageForDeletion = () => {
        isContextMenuOpen.set(false)
        messageIdsToDelete.set([$contextMenuTargetMessage!?.id])
    }

    const selectMessage = () => {
        isContextMenuOpen.set(false)
        selectedMessageIds.update(currentValue => [
            ...currentValue,
            $contextMenuTargetMessage!?.id,
        ])
    }

    const clearSelection = () => {
        isContextMenuOpen.set(false)
        selectedMessageIds.set([])
    }
</script>

<svelte:window
    on:keydown={e => {
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
                icon={IconArrowUUpLeftDuotone}
                on:click={replyMessage}
            />
        {/if}
        {#if $contextMenuTargetMessage?.expand.user.id === $page.data.user.id && !$selectedMessageIds.length}
            <MessageContextMenuItem
                title="Edit"
                icon={IconPencilSimpleDuotone}
                on:click={editMessage}
            />
        {/if}
        {#if $selectedMessageIds.length}
            {#if $contextMenuTargetMessage && $selectedMessageIds.includes($contextMenuTargetMessage?.id)}
                <MessageContextMenuItem
                    title={copyTimeoutId ? "Copied" : "Copy Selected as Text"}
                    icon={copyTimeoutId
                        ? IconCheckDuotone
                        : IconCopySimpleDuotone}
                    isDisabled={!!copyTimeoutId}
                    on:click={copyMessage}
                />
            {/if}
        {:else}
            <MessageContextMenuItem
                title={copyTimeoutId ? "Copied" : "Copy Text"}
                icon={copyTimeoutId ? IconCheckDuotone : IconCopySimpleDuotone}
                isDisabled={!!copyTimeoutId}
                on:click={copyMessage}
            />
        {/if}
        {#if $contextMenuTargetMessage?.expand.user.id === $page.data.user.id}
            {#if $selectedMessageIds.length > 0}
                {#if $contextMenuTargetMessage && $selectedMessageIds.includes($contextMenuTargetMessage?.id)}
                    <MessageContextMenuItem
                        title="Delete Selected"
                        icon={IconTrashSimpleDuotone}
                        on:click={setSelectedMessagesForDeletion}
                    />
                {/if}
            {:else}
                <MessageContextMenuItem
                    title="Delete"
                    icon={IconTrashSimpleDuotone}
                    on:click={setAMessageForDeletion}
                />
            {/if}
        {/if}
        {#if !$selectedMessageIds.includes($contextMenuTargetMessage?.id || "")}
            <MessageContextMenuItem
                title="Select"
                icon={IconCheckCircleDuotone}
                on:click={selectMessage}
            />
        {:else}
            <MessageContextMenuItem
                title="Clear Selection"
                icon={IconCheckCircleDuotone}
                on:click={clearSelection}
            />
        {/if}
    </MessageContextMenu>
</OutClick>

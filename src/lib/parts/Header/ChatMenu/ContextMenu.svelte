<script>
    import { page } from "$app/stores"
    import { copyText } from "svelte-copy"
    import OutClick from "svelte-outclick"
    import {
        isContextMenuOpen,
        contextMenuTargetEvent,
        contextMenuTargetMessage,
        isReplying,
        replyTargetMessage,
        messageIdToDelete,
        messageIdToEdit,
        messageInputElement,
    } from "./chatStores.js"
    import IconReply from "$icons/IconReply.svelte"
    import IconPen from "$icons/IconPen.svelte"
    import IconClipboard from "$icons/IconClipboard.svelte"
    import IconTrash from "$icons/IconTrash.svelte"
    import MessageContextMenu from "./MessageContextMenu.svelte"
    import MessageContextMenuItem from "./MessageContextMenuItem.svelte"

    let copyTimeoutId
</script>

<OutClick
    on:outclick={() => isContextMenuOpen.set(false)}
    excludeQuerySelectorAll=".MessageContextMenu"
>
    <MessageContextMenu
        e={$contextMenuTargetEvent}
        bind:isOpen={$isContextMenuOpen}
    >
        <MessageContextMenuItem
            title="Reply"
            icon={IconReply}
            on:click={() => {
                isContextMenuOpen.set(false)
                isReplying.set(true)
                replyTargetMessage.set($contextMenuTargetMessage)
                messageIdToEdit.set(null)
                if ($messageInputElement) $messageInputElement.focus()
            }}
        />
        {#if $contextMenuTargetMessage.expand?.user.id === $page.data.user.id}
            <MessageContextMenuItem
                title="Edit"
                icon={IconPen}
                on:click={() => {
                    isContextMenuOpen.set(false)
                    messageIdToEdit.set($contextMenuTargetMessage.id)
                    isReplying.set(false)
                    if ($messageInputElement) $messageInputElement.focus()
                }}
            />
        {/if}
        <MessageContextMenuItem
            title={copyTimeoutId ? "Copied" : "Copy"}
            icon={IconClipboard}
            isDisabled={!!copyTimeoutId}
            on:click={() => {
                copyText(
                    $contextMenuTargetMessage.content.replaceAll("<br>", "\n"),
                )

                copyTimeoutId = setTimeout(() => {
                    isContextMenuOpen.set(false)
                    copyTimeoutId = null
                }, 1000)
            }}
        />
        {#if $contextMenuTargetMessage.expand.user.id === $page.data.user.id}
            <MessageContextMenuItem
                class="text-red-500"
                title="Delete"
                icon={IconTrash}
                on:click={() => {
                    isContextMenuOpen.set(false)
                    messageIdToDelete.set($contextMenuTargetMessage.id)
                }}
            />
        {/if}
    </MessageContextMenu>
</OutClick>

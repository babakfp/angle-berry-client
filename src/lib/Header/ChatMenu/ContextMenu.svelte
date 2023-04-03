<script>
	import { copyText } from "svelte-copy"
	import OutClick from "svelte-outclick"
	import { isReplying, replyTargetMessage } from "./replyMessage.js"
	import { messageIdToDelete } from "./deleteMessage.js"
	import { messageIdToEdit } from "./editMessage.js"
	import {
		isContextMenuOpen,
		contextMenuTargetEvent,
		contextMenuTargetMessage,
	} from "./contextMenu.js"
	import IconReply from "$icons/IconReply.svelte"
	import IconPen from "$icons/IconPen.svelte"
	import IconClipboard from "$icons/IconClipboard.svelte"
	import IconTrash from "$icons/IconTrash.svelte"
	import MessageContextMenu from "./MessageContextMenu.svelte"
	import MessageContextMenuItem from "./MessageContextMenuItem.svelte"

	export let user
	export let messageInputElement = null

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
			on:click={() => {
				isContextMenuOpen.set(false)
				isReplying.set(true)
				replyTargetMessage.set($contextMenuTargetMessage)
				messageIdToEdit.set(null)
				if (messageInputElement) messageInputElement.focus()
			}}
		>
			<IconReply />
		</MessageContextMenuItem>
		{#if $contextMenuTargetMessage.expand?.user.id === user.id}
			<MessageContextMenuItem
				title="Edit"
				on:click={() => {
					isContextMenuOpen.set(false)
					messageIdToEdit.set($contextMenuTargetMessage.id)
					isReplying.set(false)
					if (messageInputElement) messageInputElement.focus()
				}}
			>
				<IconPen />
			</MessageContextMenuItem>
		{/if}
		<MessageContextMenuItem
			title={copyTimeoutId ? "Copied" : "Copy"}
			isDisabled={!!copyTimeoutId}
			on:click={() => {
				copyText(
					$contextMenuTargetMessage.content.replaceAll("<br>", "\n")
				)

				copyTimeoutId = setTimeout(() => {
					isContextMenuOpen.set(false)
					copyTimeoutId = null
				}, 1000)
			}}
		>
			<IconClipboard />
		</MessageContextMenuItem>
		{#if $contextMenuTargetMessage.expand.user.id === user.id}
			<MessageContextMenuItem
				class="text-red-500"
				title="Delete"
				on:click={() => {
					isContextMenuOpen.set(false)
					messageIdToDelete.set($contextMenuTargetMessage.id)
				}}
			>
				<IconTrash />
			</MessageContextMenuItem>
		{/if}
	</MessageContextMenu>
</OutClick>

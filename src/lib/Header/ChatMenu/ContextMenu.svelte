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
	import MessageContextMenu from "./MessageContextMenu.svelte"
	import MessageContextMenuItem from "./MessageContextMenuItem.svelte"

	export let user
	export let messageInputElement

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
			<!-- prettier-ignore -->
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"/></svg>
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
				<!-- prettier-ignore -->
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487zm0 0L19.5 7.125"/></svg>
			</MessageContextMenuItem>
		{/if}
		<MessageContextMenuItem
			title={copyTimeoutId ? "Done" : "Copy"}
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
			<!-- prettier-ignore -->
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="1.5" class="w-6 h-6" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"/></svg>
		</MessageContextMenuItem>
		{#if $contextMenuTargetMessage.expand.user.id === user.id}
			<MessageContextMenuItem
				class="text-[#ff595a] hover:bg-[#ff595a]/5"
				title="Delete"
				on:click={() => {
					isContextMenuOpen.set(false)
					messageIdToDelete.set($contextMenuTargetMessage.id)
				}}
			>
				<!-- prettier-ignore -->
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/></svg>
			</MessageContextMenuItem>
		{/if}
	</MessageContextMenu>
</OutClick>

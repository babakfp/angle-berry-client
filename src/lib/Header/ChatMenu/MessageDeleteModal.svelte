<script>
	import { pb } from "$stores/pb.js"
	import { messageIdToDelete } from "./deleteMessage.js"
	import { messageIdToEdit } from "./editMessage.js"
	import { isReplying } from "./replyMessage.js"
	import { messages } from "$stores/messages.js"
	import { contextMenuTargetMessage } from "./contextMenu.js"
	import Modal from "$lib/Modal.svelte"

	let isDeletingMessage = false
	$: isDeletePopupOpen = !!$messageIdToDelete
	$: if (!isDeletePopupOpen && $messageIdToDelete) messageIdToDelete.set(null)
</script>

<Modal bind:isOpen={isDeletePopupOpen}>
	<h3>Are you sure you want to delete this message?</h3>
	<div class="mt-4 flex justify-end gap-2">
		<button
			class="btn btn-gray"
			on:click={() => {
				messageIdToDelete.set(null)
			}}
		>
			Cancel
		</button>
		<button
			class="btn btn-danger
			{isDeletingMessage && 'pointer-events-none opacity-50'}"
			disabled={isDeletingMessage}
			on:click={async () => {
				try {
					const isMessageDeleted = await $pb
						.collection("messages")
						.delete($messageIdToDelete)

					isDeletingMessage = true
					if (isMessageDeleted) {
						isDeletingMessage = false
						messageIdToDelete.set(null)
						messageIdToEdit.set(null)
						isReplying.set(false)

						// Remove other messages reply preview to that deleted message
						messages.update(msgs =>
							msgs.map(msg => {
								if (
									msg.repliedTo &&
									msg.repliedTo ===
										$contextMenuTargetMessage.id
								) {
									msg.repliedTo = ""
									msg.expand.repliedTo = null
								}
								return msg
							})
						)
					}
				} catch (error) {
					console.error(error)
					isDeletingMessage = false
					messageIdToDelete.set(null)
					messageIdToEdit.set(null)
					isReplying.set(false)
				}
			}}
		>
			{#if isDeletingMessage}
				<!-- prettier-ignore -->
				<svg class="animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"/></svg>
			{:else}
				Delete
			{/if}
		</button>
	</div>
</Modal>

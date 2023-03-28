<script>
	import { enhance } from "$app/forms"
	import { messages, unreadMessagesLength } from "$lib/messages.js"
	import { isReplying, replyTargetMessage } from "./replyMessage.js"
	import { messageIdToDelete } from "./deleteMessage.js"
	import { pb } from "$lib/pb.js"
	import { messageIdToEdit } from "./editMessage.js"
	import PopSide from "$lib/PopSide.svelte"
	import TextArea from "$lib/Form/TextArea.svelte"
	import Message from "./Message.svelte"
	import Modal from "$lib/Modal.svelte"
	import MessageActionPreview from "./MessageActionPreview.svelte"

	export let data
	export let isOpen = false
	export let toggleButton

	messages.set(data.messages.items || [])

	let isDeletingMessage = false
	$: isDeletePopupOpen = $messageIdToDelete

	$: if (!isOpen && $messageIdToEdit) messageIdToEdit.set(null)
	$: if (isOpen && $unreadMessagesLength) unreadMessagesLength.set(0)

	let messageInputElement
	let messageInputValue = ""
	$: if (messageInputElement && messageInputValue === messageInputValue) {
		if (messageInputValue.trim()) {
			messageInputElement.style.height = null
			messageInputElement.style.height = `${messageInputElement.scrollHeight}px`
		}
	}

	messageIdToEdit.subscribe(id => {
		messageInputValue =
			$messages
				.filter(msg => msg.id === id)[0]
				?.content.replaceAll("<br>", "\n") || ""
	})

	$: isEditingMessage = !!$messageIdToEdit

	let isSendingMessage = false
	function submitMessage() {
		isSendingMessage = true
		messageInputElement.focus()
		return async ({ result, update }) => {
			isSendingMessage = false
			if (result.type === "success") {
				messageInputElement.style.height = null
				isReplying.set(false)
				messageIdToEdit.set(null)
			}
			update()
		}
	}

	let formElement

	$: replyedMessageId = $isReplying ? $replyTargetMessage.id : ""

	let isFetchingOlderMessages = false
	let isSomethingWentWrongWhenFetchingOlderMessages = false
	let pageNumberFortheNextOlderMessagesToFetch = 2
	const handleScroll = async e => {
		// Is reached the top of the scrollable?
		// Added + 200 to fetch the data earlier for a better UX
		if (
			pageNumberFortheNextOlderMessagesToFetch <=
				data.messages.totalPages &&
			Math.abs(e.target.scrollTop) + 200 >=
				e.target.scrollHeight - e.target.clientHeight
		) {
			try {
				isFetchingOlderMessages = true
				isSomethingWentWrongWhenFetchingOlderMessages = false

				const messagesRecords = await $pb
					.collection("messages")
					.getList(pageNumberFortheNextOlderMessagesToFetch, 50, {
						sort: "-created",
						expand: "user,repliedTo,repliedTo.user",
						filter: `created < "${
							$messages[$messages.length - 1].created
						}"`,
					})
				if (messagesRecords) {
					messages.update(_messages => [
						..._messages,
						...structuredClone(messagesRecords).items,
					])
					isFetchingOlderMessages = false
					pageNumberFortheNextOlderMessagesToFetch += 1
				}
			} catch (error) {
				isSomethingWentWrongWhenFetchingOlderMessages = true
				throw error
			}
		}
	}
</script>

<PopSide bind:isOpen {toggleButton}>
	{#if $messages.length > 0}
		<ol
			id="messages-wrapper"
			class="flex min-h-full flex-col-reverse content-start items-start overflow-y-auto py-4 sm:text-sm"
			on:scroll={handleScroll}
		>
			{#each $messages as message (message.id)}
				<Message user={data.user} {message} />
			{/each}
			{#if isFetchingOlderMessages}
				<div class="mx-auto flex items-center gap-2 px-4 text-gray-500">
					{#if isSomethingWentWrongWhenFetchingOlderMessages}
						<p>
							Something went wrong! Maybe refreshing the page can
							solve the problem.
						</p>
						<button>Try again</button>
					{:else}
						<!-- prettier-ignore -->
						<svg class="text-xl animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"/></svg>
						<p>Fetching older messages...</p>
					{/if}
				</div>
			{/if}
		</ol>
	{:else}
		<p class="py-6 px-4">
			No messages have been found here. You can be the one that sends the
			first message in this chat room.
		</p>
	{/if}
	<form
		class="sticky bottom-0 self-end
		{isSendingMessage && 'pointer-events-none'}
		"
		method="POST"
		action="/chat"
		use:enhance={submitMessage}
		bind:this={formElement}
		on:keypress={e => {
			if (
				!isSendingMessage &&
				e.ctrlKey &&
				(e.code === "Enter" || e.key === "Enter")
			) {
				formElement.requestSubmit()
			}
		}}
	>
		{#if $isReplying}
			<MessageActionPreview
				title="Replying to {$replyTargetMessage.expand.user.username}"
				content={$replyTargetMessage.content}
				messageId={$replyTargetMessage.id}
				on:close={() => isReplying.set(false)}
				bind:isOpen={$isReplying}
			/>
		{/if}
		{#if $messageIdToEdit}
			<MessageActionPreview
				title="Editing message"
				content={$messages.filter(msg => msg.id === $messageIdToEdit)[0]
					?.content}
				messageId={$messageIdToEdit}
				on:close={() => messageIdToEdit.set(null)}
				bind:isOpen={isEditingMessage}
			/>
		{/if}
		<div class="relative">
			<TextArea
				class="!max-h-32 rounded-none border-t border-white/5 bg-gray-800 pr-14 shadow-[0_-1px_3px_0_rgb(0_0_0_/_0.1),_0_-1px_2px_-1px_rgb(0_0_0_/_0.1)] outline-inset"
				name="messageContent"
				placeholder="Write your message..."
				required={true}
				bind:element={messageInputElement}
				bind:value={messageInputValue}
			/>
			<button
				class="absolute right-0 bottom-0 top-0 flex items-end outline-inset
				{isSendingMessage && 'opacity-50'}"
				disabled={isSendingMessage}
			>
				<div
					class="flex min-h-14 items-center px-4 text-2xl hover:bg-white/5"
				>
					{#if $messageIdToEdit}
						<!-- prettier-ignore -->
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5"/></svg>
					{:else if isSendingMessage}
						<!-- prettier-ignore -->
						<svg class="animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"/></svg>
					{:else}
						<!-- prettier-ignore -->
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.269 3.126A59.768 59.768 0 0 1 21.485 12 59.77 59.77 0 0 1 3.27 20.876L5.999 12zm0 0h7.5"/></svg>
					{/if}
				</div>
			</button>
		</div>
		<input
			type="hidden"
			name="replyedMessageId"
			bind:value={replyedMessageId}
		/>
		<input
			type="hidden"
			name="messageIdToEdit"
			bind:value={$messageIdToEdit}
		/>
	</form>

	<svelte:fragment slot="outer">
		<Modal bind:isOpen={isDeletePopupOpen}>
			<h3>Are you sure you want to delete this message?</h3>
			<div class="mt-4 flex justify-end gap-2">
				<button
					class="btn btn-light"
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
	</svelte:fragment>
</PopSide>

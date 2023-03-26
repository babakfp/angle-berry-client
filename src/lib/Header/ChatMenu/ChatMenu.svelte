<script>
	import { enhance } from "$app/forms"
	import PopSide from "$lib/PopSide.svelte"
	import TextArea from "$lib/Form/TextArea.svelte"
	import { messages, unreadMessagesLength } from "$lib/messages.js"
	import Message from "./Message.svelte"
	import { isReplying, messageThatWeAreReplyingTo } from "./replying"
	import Reply from "./Reply.svelte"
	import { PUBLIC_POCKETBASE_URL } from "$env/static/public"
	import PocketBase from "pocketbase"
	const pb = new PocketBase(PUBLIC_POCKETBASE_URL)
	let isDeletePopupOpen = true
	import OutClick from "svelte-outclick"

	export let data
	messages.set(data.messages.items || [])

	export let isOpen = false
	export let toggleButton

	$: if (isOpen && $unreadMessagesLength) {
		unreadMessagesLength.set(0)
	}

	let messageContent = ""
	let messageTextElement
	$: if (messageTextElement && messageContent === messageContent) {
		if (messageContent.trim()) {
			messageTextElement.style.height = null
			messageTextElement.style.height = `${messageTextElement.scrollHeight}px`
		}
	}

	let isSendingMessage = false
	function submitMessage() {
		isSendingMessage = true
		messageTextElement.focus()
		return async ({ result, update }) => {
			isSendingMessage = false
			if (result.type === "success") {
				messageTextElement.style.height = null
				isReplying.set(false)
			}
			update()
		}
	}

	let formElement

	$: replyedMessageId = $isReplying ? $messageThatWeAreReplyingTo.id : ""

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

				const messagesRecords = await pb
					.collection("messages")
					.getList(pageNumberFortheNextOlderMessagesToFetch, 50, {
						sort: "-created",
						expand: "user,repliedTo",
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
						<svg class="text-xl animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
					</svg>
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
			<Reply />
		{/if}
		<div class="relative">
			<TextArea
				class="!max-h-32 rounded-none border-t border-white/5 bg-gray-800 pr-14 shadow-[0_-1px_3px_0_rgb(0_0_0_/_0.1),_0_-1px_2px_-1px_rgb(0_0_0_/_0.1)] outline-inset"
				name="messageContent"
				placeholder="Write your message..."
				required={true}
				bind:element={messageTextElement}
				bind:value={messageContent}
			/>
			<button
				class="absolute right-0 bottom-0 top-0 flex items-end outline-inset
			{isSendingMessage && 'opacity-50'}"
				disabled={isSendingMessage}
			>
				<div class="flex min-h-14 items-center px-4 hover:bg-white/5">
					{#if isSendingMessage}
						<!-- prettier-ignore -->
						<svg class="text-2xl animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
					</svg>
					{:else}
						<!-- prettier-ignore -->
						<svg class="text-2xl" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
					</svg>
					{/if}
				</div>
			</button>
		</div>
		<input
			type="hidden"
			name="replyedMessageId"
			bind:value={replyedMessageId}
		/>
	</form>
</PopSide>

{#if isDeletePopupOpen}
	<!-- TODO excludeElements={toggleButton} -->
	<OutClick on:outclick={() => (isDeletePopupOpen = false)}>
		<div
			class="fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-gray-800/50 p-8"
		>
			<!-- Inner -->
			<div
				class="max-w-md overflow-y-auto rounded bg-gray-700 py-8 px-6 drop-shadow"
			>
				<div class="flex items-center gap-2 text-white">
					<!-- prettier-ignore -->
					<svg class="text-xl" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0zm-9-3.75h.008v.008H12V8.25z"/></svg>
					<span class="-mb-[3px]">Delete Message</span>
				</div>
				<h3 class="mt-2">
					Are you sure you want to delete this message?
				</h3>
				<div class="mt-4 flex gap-2">
					<button class="btn btn-outline">No, cancel</button>
					<button class="btn btn-danger">Yes, I'm sure</button>
				</div>
			</div>
		</div>
	</OutClick>
{/if}

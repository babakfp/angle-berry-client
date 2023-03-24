<script>
	import { enhance } from "$app/forms"
	import PopSide from "$lib/PopSide.svelte"
	import TextArea from "$lib/Form/TextArea.svelte"
	import { messages, unreadMessagesLength } from "$lib/messages.js"
	import Message from "./Message.svelte"
	import { isReplying } from "./replying"
	import Reply from "./Reply.svelte"

	export let data
	messages.set(data.messages || [])

	export let isOpen = true
	export let toggleButton

	$: if (isOpen && $unreadMessagesLength) {
		unreadMessagesLength.set(0)
	}

	let messageContent
	let messageTextElement
	$: if (messageTextElement && messageContent === messageContent) {
		messageTextElement.style.height = null
		messageTextElement.style.height = `${messageTextElement.scrollHeight}px`
	}

	let isSendingMessage = false
	function submitMessage() {
		isSendingMessage = true
		messageTextElement.focus()
		return async ({ result, update }) => {
			isSendingMessage = false
			if (result.type === "success") {
				messageTextElement.style.height = null
			}
			update()
		}
	}

	let formElement
</script>

<PopSide bind:isOpen {toggleButton}>
	{#if $messages.length > 0}
		<ol
			class="flex min-h-full flex-col-reverse content-start items-start gap-4 overflow-y-auto px-4 py-6 sm:text-sm"
		>
			{#each $messages as message (message.id)}
				<Message user={data.user} {message} />
			{/each}
		</ol>
	{:else}
		<p class="p-4">
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
			<Reply user={data.user} />
		{/if}
		<div class="relative">
			<TextArea
				class="!max-h-20 rounded-none border-t border-white/5 bg-gray-800 pr-14 outline-inset"
				name="messageContent"
				placeholder="Write your message..."
				minlength={3}
				required={true}
				bind:element={messageTextElement}
				bind:value={messageContent}
			/>
			<button
				class="group absolute right-0 bottom-0 top-0 flex items-end outline-inset
			{isSendingMessage && 'opacity-50'}"
				disabled={isSendingMessage}
			>
				<div class="flex min-h-14 items-center px-4">
					{#if isSendingMessage}
						<!-- prettier-ignore -->
						<svg class="text-2xl animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
					</svg>
					{:else}
						<!-- prettier-ignore -->
						<svg class="text-2xl group-hover:text-white duration-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
					</svg>
					{/if}
				</div>
			</button>
		</div>
	</form>
</PopSide>

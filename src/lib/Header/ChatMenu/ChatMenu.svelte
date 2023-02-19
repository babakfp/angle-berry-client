<script>
	import { enhance } from "$app/forms"
	import PopSide from "$lib/PopSide.svelte"
	import TextArea from "$lib/Form/TextArea.svelte"
	import { messages } from "$lib/messages.js"
	import Message from "./Message.svelte"

	export let data
	messages.set(data.messages || [])

	export let isOpen
	export let toggleButton

	let messageContent
	let messageTextElement
	$: if (messageTextElement && messageContent === messageContent) {
		messageTextElement.style.height = null
		messageTextElement.style.height = `${messageTextElement.scrollHeight}px`
	}
	let messageOlderLabelElement
	$: if (messageOlderLabelElement && messageContent === messageContent) {
		messageOlderLabelElement.style.setProperty("--tw-translate-y", 0)
		messageOlderLabelElement.style.setProperty(
			"--tw-translate-y",
			`-${messageTextElement.clientHeight - 56}px`
		)
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

	let previousDate
	function handleDailyDate(messageCreated) {
		const messageDate = new Date(messageCreated).toLocaleDateString()
		if (previousDate === messageDate) {
			return ""
		} else {
			previousDate = messageDate
			return messageDate
		}
	}

	let formElement
</script>

<PopSide bind:isOpen {toggleButton}>
	{#if $messages.length > 0}
		<ol
			class="grid min-h-full content-start items-start gap-4 overflow-y-auto px-4 py-10 sm:text-sm"
		>
			{#each $messages as message (message.id)}
				{@const date = handleDailyDate(message.created)}
				{#if date}
					<div
						class="sticky top-0 mx-auto rounded-full bg-gray-800 py-1 px-2 text-center text-2xs text-gray-500 shadow"
					>
						{date}
					</div>
				{/if}
				<Message user={data.user} {message} />
			{/each}
		</ol>
		<div
			class="absolute top-16 flex items-center gap-1 rounded-full bg-gray-800 py-1 px-2 text-2xs text-gray-500 shadow inset-x-center sm:top-2"
		>
			<!-- prettier-ignore -->
			<svg class="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75" />
				</svg>
			<span>newer messages</span>
		</div>
		<div
			class="absolute bottom-16 flex items-center gap-1 rounded-full bg-gray-800 py-1 px-2 text-2xs text-gray-500 shadow inset-x-center"
			bind:this={messageOlderLabelElement}
		>
			<!-- prettier-ignore -->
			<svg class="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75" />
				</svg>
			<span>older messages</span>
		</div>
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
		<TextArea
			class="rounded-none pr-14 shadow-[0_-1px_3px_0_rgb(0_0_0_/_0.1),_0_-1px_2px_-1px_rgb(0_0_0_/_0.1)] -outline-offset-2"
			name="messageContent"
			placeholder="Write your message..."
			minlength={3}
			required={true}
			bind:element={messageTextElement}
			bind:value={messageContent}
		/>
		<button
			class="group absolute right-0 bottom-0 top-0 flex items-end -outline-offset-2
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
	</form>
</PopSide>

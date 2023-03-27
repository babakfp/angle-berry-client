<!-- Used for reply and edit preview -->

<script>
	import { createEventDispatcher } from "svelte"
	import { goToRepliedMessage } from "$lib/Header/ChatMenu/goToRepliedMessage.js"

	export let title
	export let content
	export let messageId
	export let isOpen = false

	const dispatch = createEventDispatcher()

	let intervalId
	let timeoutId

	function handleJumpToMessage() {
		const v = goToRepliedMessage(messageId, intervalId, timeoutId)
		intervalId = v?.intervalId
		timeoutId = v?.timeoutId
	}

	function handleClosing() {
		isOpen = false
		dispatch("close")
	}
</script>

{#if isOpen}
	<div
		class="grid grid-cols-[1fr_auto] items-stretch justify-between border-t border-white/5 text-sm shadow-[0_-1px_3px_0_rgb(0_0_0_/_0.1),_0_-1px_2px_-1px_rgb(0_0_0_/_0.1)]"
	>
		<button
			class="block w-full py-4 pl-4 text-left outline-inset hover:bg-white/5"
			type="button"
			on:click={handleJumpToMessage}
		>
			<div class="text-xs text-gray-500">{title}</div>
			<div class="line-clamp-1">{content}</div>
		</button>
		<button
			class="flex p-4 outline-inset hover:bg-white/5"
			type="button"
			on:click={handleClosing}
		>
			<!-- prettier-ignore -->
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"/></svg>
		</button>
	</div>
{/if}

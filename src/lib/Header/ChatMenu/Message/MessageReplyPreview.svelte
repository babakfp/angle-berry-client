<script>
	import { goToMessage } from "../goToMessage.js"

	// Message that we are replying to.
	export let replyTargetMessage

	// IDs to keep a track of things.
	let intervalId, timeoutId

	// When clicked, starts scrolling to the message being replied to.
	function handleGoToMessage() {
		const result = goToMessage(replyTargetMessage.id, intervalId, timeoutId)
		intervalId = result?.intervalId
		timeoutId = result?.timeoutId
	}
</script>

{#if replyTargetMessage?.content}
	<button
		class="mb-2 -ml-3 block border-l-2 pl-2 text-left text-xs text-white/80 hover:text-white/100"
		on:click={handleGoToMessage}
	>
		<div class="flex gap-1">
			<span class="font-semibold">
				{replyTargetMessage?.expand?.user?.username}
			</span>
			<div class="line-clamp-1">
				{@html replyTargetMessage?.content}
			</div>
		</div>
	</button>
{/if}

<script>
	import { isReplying, messageThatWeAreReplyingTo } from "./replying"
	import { goToRepliedMessage } from "$lib/Header/ChatMenu/goToRepliedMessage.js"

	let intervalId
	let timeoutId
</script>

<div
	class="grid grid-cols-[1fr_auto] items-stretch justify-between border-t border-white/5 text-sm shadow-[0_-1px_3px_0_rgb(0_0_0_/_0.1),_0_-1px_2px_-1px_rgb(0_0_0_/_0.1)]"
>
	<button
		class="block w-full py-4 pl-4 text-left outline-inset hover:bg-white/5"
		href="#{$messageThatWeAreReplyingTo.id}"
		type="button"
		on:click={() => {
			const result = goToRepliedMessage(
				$messageThatWeAreReplyingTo.id,
				intervalId,
				timeoutId
			)
			intervalId = result?.intervalId
			timeoutId = result?.timeoutId
		}}
	>
		<div class="text-xs text-gray-500">
			Replying to {$messageThatWeAreReplyingTo.expand.user.id}
		</div>
		<div class="line-clamp-1">{$messageThatWeAreReplyingTo.content}</div>
	</button>
	<button
		class="flex p-4 outline-inset hover:bg-white/5"
		type="button"
		on:click={() => isReplying.set(false)}
	>
		<!-- prettier-ignore -->
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"/></svg>
	</button>
</div>

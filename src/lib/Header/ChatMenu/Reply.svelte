<script>
	import { isReplying, messageThatWeAreReplyingTo } from "./replying"

	let intervalId = null
	let timeoutId = null

	const handleClick = () => {
		if (intervalId) clearInterval(intervalId)
		if (timeoutId) clearTimeout(timeoutId)

		const messageElementThatWeAreReplyingTo = document.getElementById(
			$messageThatWeAreReplyingTo.id
		)

		const replyHighlightElement =
			messageElementThatWeAreReplyingTo.querySelector(".reply-highlight")

		replyHighlightElement.style.opacity = 1
		intervalId = setInterval(() => {
			replyHighlightElement.style.opacity =
				replyHighlightElement.style.opacity - 0.05
		}, 100)

		timeoutId = setTimeout(() => clearInterval(intervalId), 2000)

		messageElementThatWeAreReplyingTo.scrollIntoView({
			behavior: "smooth",
			block: "center",
		})
	}
</script>

<div
	class="grid grid-cols-[1fr_auto] items-stretch justify-between border-t border-white/5 text-sm shadow-[0_-1px_3px_0_rgb(0_0_0_/_0.1),_0_-1px_2px_-1px_rgb(0_0_0_/_0.1)]"
>
	<button
		class="block w-full py-4 pl-4 text-left line-clamp-2 outline-inset hover:bg-white/5"
		href="#{$messageThatWeAreReplyingTo.id}"
		type="button"
		on:click={handleClick}
	>
		<div class="text-xs text-gray-500">
			Replying to {$messageThatWeAreReplyingTo.expand.user.id}
		</div>
		<div>{$messageThatWeAreReplyingTo.content}</div>
	</button>
	<button
		class="flex items-center px-4 outline-inset hover:bg-white/5"
		type="button"
		on:click={() => isReplying.set(false)}
	>
		<!-- prettier-ignore -->
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
			<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
		</svg>
	</button>
</div>

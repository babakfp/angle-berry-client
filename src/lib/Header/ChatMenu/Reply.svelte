<script>
	import { isReplying, messageThatWeAreReplyingTo } from "./replying"
	export let user
	const handleClick = () => {
		document
			.querySelectorAll(".highlight-element")
			.forEach(el => el.remove())

		const messageElementThatWeAreReplyingTo = document?.getElementById(
			$messageThatWeAreReplyingTo.id
		)

		const highlightElement = document.createElement("div")
		highlightElement.classList.add(
			"highlight-element",
			"absolute",
			"-inset-y-2",
			"w-screen",
			"sm:w-96",
			"bg-white/10",
			"duration-300",
			user.id === $messageThatWeAreReplyingTo.expand.user.id
				? "-right-4"
				: "-left-4"
		)

		messageElementThatWeAreReplyingTo.appendChild(highlightElement)
		highlightElement.style.opacity = 1
		const myInterval = setInterval(() => {
			highlightElement.style.opacity =
				highlightElement.style.opacity - 0.05
			console.log(highlightElement.style.opacity)
		}, 100)

		setTimeout(() => {
			highlightElement.remove()
			clearInterval(myInterval)
		}, 2000)

		messageElementThatWeAreReplyingTo.scrollIntoView({
			behavior: "smooth",
			block: "center",
		})
	}
</script>

<div
	class="flex items-stretch justify-between border-t border-white/5 text-sm shadow-[0_-1px_3px_0_rgb(0_0_0_/_0.1),_0_-1px_2px_-1px_rgb(0_0_0_/_0.1)]"
>
	<button
		class="block w-full py-4 pl-4 text-left line-clamp-2 outline-inset"
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
		class="flex h-8 items-center px-4 outline-inset hover:bg-gray-700"
		type="button"
		on:click={() => isReplying.set(false)}
	>
		<!-- prettier-ignore -->
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
					</svg>
	</button>
</div>

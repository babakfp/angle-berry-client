<script>
	import { isReplying, messageThatWeAreReplyingTo } from "./replying"
	export let user
	export let message
	export let isContextMenuOpen = false
</script>

<ul
	class="absolute top-full max-h-56 w-24 -translate-y-5 overflow-y-auto rounded bg-gray-700 text-xs shadow hide
		{user.id === message.expand.user.id ? 'right-4' : 'left-4'}
		{isContextMenuOpen && 'show'}
		"
>
	<li class="flex">
		<button
			class="flex w-full items-center gap-2 rounded px-4 py-2 hover:text-white"
			on:click={() => {
				isContextMenuOpen = false
				isReplying.set(true)
				messageThatWeAreReplyingTo.set(message)
			}}
		>
			<!-- prettier-ignore -->
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
			</svg>
			<!-- Remove the styles if you change the font -->
			<span class="pt-0.5">Reply</span>
		</button>
	</li>
</ul>

<script>
	import { isReplying, messageThatWeAreReplyingTo } from "./replying"
	export let user
	export let message
	export let isContextMenuOpen = false
</script>

<ul
	class="absolute top-full max-h-56 w-32 -translate-y-3 overflow-y-auto rounded bg-gray-700 text-xs shadow hide
		{user.id === message.expand.user.id && 'right-0'}
		{isContextMenuOpen && 'show'}
		"
>
	<li class="flex">
		<button
			class="flex w-full rounded px-4 py-2 hover:text-white"
			on:click={() => {
				isContextMenuOpen = false
				isReplying.set(true)
				messageThatWeAreReplyingTo.set(message)
			}}
		>
			Reply
		</button>
	</li>
</ul>

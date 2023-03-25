<script>
	import { fly } from "svelte/transition"
	import { formatTimeByAMPM } from "$lib/formatTimeByAMPM.js"
	import OutClick from "svelte-outclick"
	import MessageContextMenu from "./MessageContextMenu.svelte"
	import MessageContextMenuItem from "./MessageContextMenuItem.svelte"
	import { goToRepliedMessage } from "$lib/Header/ChatMenu/goToRepliedMessage.js"
	import { isReplying, messageThatWeAreReplyingTo } from "./replying"

	export let user
	export let message

	let isContextMenuOpen
	let contextMenuEvent
	let intervalId
	let timeoutId

	const date = new Date(message.created)
	const isToday = checkIsToday(date)
	const isYesterday = checkIsYesterday(date)

	function checkIsToday(someDate) {
		const today = new Date()
		return (
			someDate.getDate() === today.getDate() &&
			someDate.getMonth() === today.getMonth() &&
			someDate.getFullYear() === today.getFullYear()
		)
	}

	function checkIsYesterday(someDate) {
		const today = new Date()
		return (
			someDate.getDate() === today.getDate() - 1 &&
			someDate.getMonth() === today.getMonth() &&
			someDate.getFullYear() === today.getFullYear()
		)
	}
</script>

<li
	id={message.id}
	class="relative grid w-full px-4 py-2
		{user.id === message.expand.user.id && 'mr-0 ml-auto'}
	"
	transition:fly|local={{
		x: user.id === message.expand.user.id ? 64 : -64,
		duration: 500,
	}}
>
	<div
		class="reply-highlight absolute inset-0 -z-1 bg-white/20 opacity-0 duration-200 ease-in-out"
	/>

	{#if user.id !== message.expand.user.id}
		<span class="text-xs font-semibold">
			{message.expand.user.username}
		</span>
	{/if}

	<OutClick
		on:outclick={() => (isContextMenuOpen = false)}
		excludeQuerySelectorAll=".MessageContextMenu"
	>
		<div
			class="message-content-wrapper relative max-w-80 break-words rounded bg-gray-700 py-2 pl-3 pr-4 shadow
				{user.id === message.expand.user.id
				? 'justify-self-end rounded-br-[2px] !bg-[#7e6dd1] text-white'
				: 'mt-0.5 justify-self-start rounded-tl-[2px]'}
			"
			on:contextmenu|preventDefault={e => {
				contextMenuEvent = e
				isContextMenuOpen = true
			}}
		>
			{#if message?.expand?.repliedTo?.content}
				<button
					class="mb-2 -ml-3 block border-l-2 pl-2 text-left text-xs text-white/80 hover:text-white/100"
					on:click={() => {
						const result = goToRepliedMessage(
							message.expand.repliedTo.id,
							intervalId,
							timeoutId
						)
						intervalId = result?.intervalId
						timeoutId = result?.timeoutId
					}}
				>
					<div class="line-clamp-1">
						<span class="font-semibold">
							{message.expand.user.username}
						</span>
						<span>
							{message?.expand?.repliedTo?.content}
						</span>
					</div>
				</button>
			{/if}

			{@html message.content}

			<MessageContextMenu
				e={contextMenuEvent}
				bind:isOpen={isContextMenuOpen}
			>
				<MessageContextMenuItem
					title="Reply"
					on:click={() => {
						isContextMenuOpen = false
						isReplying.set(true)
						messageThatWeAreReplyingTo.set(message)
					}}
				>
					<!-- prettier-ignore -->
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"/></svg>
				</MessageContextMenuItem>
			</MessageContextMenu>
		</div>
	</OutClick>
	<div
		class="mt-1.5 text-2xs text-gray-500
			{user.id === message.expand.user.id && 'text-right'}"
	>
		<span>
			{#if isToday || isYesterday}
				{isToday ? "Today" : "Yesterday"} at {formatTimeByAMPM(date)}
			{:else}
				{date.toLocaleDateString()} {formatTimeByAMPM(date)}
			{/if}
		</span>
	</div>
</li>

<style lang="postcss">
	/* TODO: This is for when we add markdown support */
	.message-content-wrapper :global(a) {
		@apply break-all;
	}
	/* Removed this because it's buggy */
	/* .message-content-wrapper,
	.message-content-wrapper :global(*) {
		@apply select-text;
	} */
</style>

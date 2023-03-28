<script>
	import { fly } from "svelte/transition"
	import { formatTimeByAMPM } from "$lib/formatTimeByAMPM.js"
	import OutClick from "svelte-outclick"
	import MessageContextMenu from "./MessageContextMenu.svelte"
	import MessageContextMenuItem from "./MessageContextMenuItem.svelte"
	import { goToChatMessage } from "$lib/Header/ChatMenu/goToChatMessage.js"
	import { isReplying, replyTargetMessage } from "./replying"
	import { copyText } from "svelte-copy"
	import { messageIdToDelete } from "./deleteMessage.js"
	import { messageIdToEdit } from "./editMessage.js"
	export let user
	export let message

	let isContextMenuOpen
	let contextMenuEvent
	let intervalId
	let timeoutId
	let copyTimeoutId

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
					const result = goToChatMessage(
						message.expand.repliedTo.id,
						intervalId,
						timeoutId
					)
					intervalId = result?.intervalId
					timeoutId = result?.timeoutId
				}}
			>
				<div class="flex gap-1">
					<span class="font-semibold">
						{message?.expand?.repliedTo?.expand?.user?.username}
					</span>
					<div class="line-clamp-1">
						{@html message?.expand?.repliedTo?.content}
					</div>
				</div>
			</button>
		{/if}

		{@html message.content}

		<OutClick
			on:outclick={() => (isContextMenuOpen = false)}
			excludeQuerySelectorAll=".MessageContextMenu"
		>
			<MessageContextMenu
				e={contextMenuEvent}
				bind:isOpen={isContextMenuOpen}
			>
				<MessageContextMenuItem
					title="Reply"
					on:click={() => {
						isContextMenuOpen = false
						isReplying.set(true)
						replyTargetMessage.set(message)
					}}
				>
					<!-- prettier-ignore -->
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"/></svg>
				</MessageContextMenuItem>
				{#if message.expand.user.id === user.id}
					<MessageContextMenuItem
						title="Edit"
						on:click={() => {
							isContextMenuOpen = false
							messageIdToEdit.set(message.id)
						}}
					>
						<!-- prettier-ignore -->
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487zm0 0L19.5 7.125"/></svg>
					</MessageContextMenuItem>
				{/if}
				<MessageContextMenuItem
					title={copyTimeoutId ? "Done!" : "Copy"}
					isDisabled={!!copyTimeoutId}
					on:click={() => {
						copyText(message.content.replaceAll("<br>", "\n"))

						copyTimeoutId = setTimeout(() => {
							isContextMenuOpen = false
							copyTimeoutId = null
						}, 1000)
					}}
				>
					<!-- prettier-ignore -->
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="1.5" class="w-6 h-6" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"/></svg>
				</MessageContextMenuItem>
				{#if message.expand.user.id === user.id}
					<MessageContextMenuItem
						class="text-[#ff595a] hover:bg-[#ff595a]/5"
						title="Delete"
						on:click={() => {
							isContextMenuOpen = false
							messageIdToDelete.set(message.id)
						}}
					>
						<!-- prettier-ignore -->
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/></svg>
					</MessageContextMenuItem>
				{/if}
			</MessageContextMenu>
		</OutClick>
	</div>
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

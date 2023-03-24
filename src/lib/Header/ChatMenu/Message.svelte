<script>
	import { fly } from "svelte/transition"
	import { formatTimeByAMPM } from "$lib/formatTimeByAMPM.js"
	import OutClick from "svelte-outclick"
	import MessageContextMenu from "./MessageContextMenu.svelte"

	export let user
	export let message

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

	let isContextMenuOpen

	function handleContextMenu() {
		isContextMenuOpen = true
	}
</script>

<li
	id={message.id}
	class="relative grid w-full px-4 py-2
		{user.id === message.expand.user.id && 'mr-0 ml-auto'}
	"
	on:contextmenu|preventDefault={handleContextMenu}
	transition:fly={{
		x: user.id === message.expand.user.id ? 64 : -64,
		duration: 500,
	}}
>
	<div
		class="reply-highlight absolute inset-0 bg-white/20 opacity-0 duration-200 ease-in-out"
	/>

	{#if user.id !== message.expand.user.id}
		<span class="text-xs font-semibold">
			{message.expand.user.username}
		</span>
	{/if}

	<OutClick
		on:outclick={() => (isContextMenuOpen = false)}
		excludeQuerySelectorAll="message-content-wrapper"
	>
		<div
			class="message-content-wrapper max-w-80 break-words rounded bg-gray-700 py-2 pl-3 pr-4 shadow
				{user.id === message.expand.user.id
				? 'justify-self-end rounded-br-[2px] !bg-[#7e6dd1] text-white'
				: 'mt-0.5 justify-self-start rounded-tl-[2px]'}
			"
		>
			{@html message.content}
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

	<MessageContextMenu {user} {message} bind:isContextMenuOpen />
</li>

<style lang="postcss">
	/* TODO: This is for when we add markdown support */
	.message-content-wrapper :global(a) {
		@apply break-all;
	}
	.message-content-wrapper,
	.message-content-wrapper :global(*) {
		@apply select-text;
	}
</style>

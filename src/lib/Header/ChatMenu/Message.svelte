<script>
	import { fly } from "svelte/transition"
	import { formatTimeByAMPM } from "$lib/formatTimeByAMPM.js"

	export let user
	export let message

	const date = new Date(message.created)
</script>

<li
	class="grid
		{user.id === message.expand.user.id
		? 'justify-self-end'
		: 'justify-self-start'}"
	transition:fly={{
		x: user.id === message.expand.user.id ? 64 : -64,
		duration: 500,
	}}
>
	{#if user.id !== message.expand.user.id}
		<span class="text-xs font-semibold">
			{message.expand.user.username}
		</span>
	{/if}
	<div
		class="message-content-wrapper max-w-96 rounded bg-gray-700 py-2 pl-3 pr-6 shadow
		{user.id === message.expand.user.id
			? 'ml-8 rounded-br-[2px]'
			: 'mr-8 mt-1 rounded-tl-[2px]'}"
	>
		{@html message.content}
	</div>
	<div
		class="mt-1 text-xs text-gray-500
			{user.id === message.expand.user.id ? 'text-right' : 'text-left'}"
	>
		<span>{formatTimeByAMPM(date)}</span>
	</div>
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

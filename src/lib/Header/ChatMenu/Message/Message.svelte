<script>
	import { shrinkHeight } from "$lib/shrinkHeight.js"
	import {
		isContextMenuOpen,
		contextMenuTargetEvent,
		contextMenuTargetMessage,
	} from "../contextMenu.js"
	import MessageDateAndTime from "./MessageDateAndTime.svelte"
	import MessageReplyPreview from "./MessageReplyPreview.svelte"

	export let user
	export let message

	const isCurrentUser = message.expand.user.id === user.id
</script>

<li id={message.id} class="w-full {isCurrentUser && 'ml-auto'}">
	<div
		class="relative grid px-4 py-2"
		in:shrinkHeight|local={{ duration: 200 }}
		out:shrinkHeight|local={{ duration: 200 }}
	>
		<div
			class="reply-highlight absolute inset-0 -z-1 bg-white/20 opacity-0 duration-200 ease-in-out"
		/>

		{#if !isCurrentUser}
			<span class="text-xs font-semibold">
				{message.expand.user.username}
			</span>
		{/if}

		<div
			class="message-content-wrapper relative max-w-80 break-words rounded bg-gray-700 py-2 pl-3 pr-4 shadow
			{isCurrentUser
				? 'justify-self-end rounded-br-[2px] !bg-[#7e6dd1] text-white'
				: 'mt-0.5 justify-self-start rounded-tl-[2px]'}
		"
			on:contextmenu|preventDefault={e => {
				isContextMenuOpen.set(true)
				contextMenuTargetEvent.set(e)
				contextMenuTargetMessage.set(message)
			}}
		>
			<MessageReplyPreview
				replyTargetMessage={message?.expand?.repliedTo}
			/>

			<div>
				{@html message.content}
			</div>
		</div>

		<MessageDateAndTime
			{isCurrentUser}
			created={message.created}
			updated={message.updated}
		/>
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

<script>
	import { page } from "$app/stores"
	import { unreadMessagesLength } from "$stores/messages.js"
	import { unseenEventsLength } from "$stores/events.js"
	import Avatar from "$lib/Avatar.svelte"
	import ChatMenu from "./ChatMenu/ChatMenu.svelte"
	import EventsMenu from "./EventsMenu/EventsMenu.svelte"
	import UserMenu from "./UserMenu/UserMenu.svelte"
	import NotificationBlob from "$lib/NotificationBlob.svelte"

	export let data
	export let user
	export let tiers

	let isEventsMenuOpen
	let eventsMenuToggle

	let isChatMenuOpen
	let chatMenuToggle

	let isUserMenuOpen = false
	let userMenuToggle
</script>

<header
	class="sticky top-0 z-50 h-header-height overflow-x-clip bg-gray-800 shadow"
>
	<div class="container flex h-full justify-between px-0">
		<a
			class="flex items-center px-4 text-white underline outline-inset
				{$page.url.pathname === '/' && 'pointer-events-none'}
			"
			href="/"
		>
			Angle Berry
		</a>
		<div class="flex">
			<button
				class="group relative flex items-center px-2 outline-inset"
				bind:this={eventsMenuToggle}
				on:click={() => (isEventsMenuOpen = !isEventsMenuOpen)}
			>
				<!-- prettier-ignore -->
				<svg class="text-2xl group-hover:text-white duration-200" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"/></svg>
				{#if $unseenEventsLength > 0}
					<NotificationBlob>
						{$unseenEventsLength}
					</NotificationBlob>
				{/if}
			</button>
			<button
				class="group relative flex items-center px-2 outline-inset"
				bind:this={chatMenuToggle}
				on:click={() => (isChatMenuOpen = !isChatMenuOpen)}
			>
				<!-- prettier-ignore -->
				<svg class="text-2xl group-hover:text-white duration-200" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"/></svg>
				{#if $unreadMessagesLength > 0}
					<NotificationBlob>
						{$unreadMessagesLength}
					</NotificationBlob>
				{/if}
			</button>
			<div class="relative flex">
				<button
					class="flex items-center gap-2 pr-4 pl-2 duration-200 outline-inset hover:text-white"
					on:click={() => (isUserMenuOpen = !isUserMenuOpen)}
					bind:this={userMenuToggle}
				>
					<Avatar class="w-8 rounded-full" />
					{user.username}
				</button>
				<UserMenu
					user={data.user}
					{tiers}
					{userMenuToggle}
					bind:isUserMenuOpen
				/>
			</div>
		</div>
	</div>
</header>

<EventsMenu
	{data}
	bind:isOpen={isEventsMenuOpen}
	toggleButton={eventsMenuToggle}
/>
<ChatMenu {data} bind:isOpen={isChatMenuOpen} toggleButton={chatMenuToggle} />

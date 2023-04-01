<script>
	import { fly } from "svelte/transition"
	import UserTooltipInfo from "./UserTooltipInfo.svelte"

	export let user
	export let event

	let eventType = "userJoined"
	if (event.inviter) eventType = "userJoinedByAnInvite"
</script>

<li
	class="border-b border-white/5 px-4 py-6"
	transition:fly={{ x: 64, duration: 500 }}
>
	{#if eventType === "userJoined"}
		{#if event.expand.user.id === user.id}
			<p
				>Welcome <UserTooltipInfo user={event.expand.user} />. You
				successfully joined.</p
			>
		{:else}
			<p>
				<UserTooltipInfo user={event.expand.user} />
				successfully joined.
			</p>
		{/if}
	{:else if eventType === "userJoinedByAnInvite"}
		{#if event.expand.user.id === user.id}
			<p>
				Welcome. You successfully joined. <UserTooltipInfo
					user={event.expand.inviter}
				/> invited you.
			</p>
		{:else}
			<p>
				<UserTooltipInfo user={event.expand.inviter} /> invited <UserTooltipInfo
					user={event.expand.user}
				/>. Now they have {event.inviterInvites} invites.
			</p>
		{/if}
	{/if}
</li>

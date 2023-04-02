<script>
	import { fly } from "svelte/transition"
	import UserTooltipInfo from "./UserTooltipInfo.svelte"

	export let user
	export let event

	let eventType = "userJoined"
	if (event.inviter) eventType = "userJoinedByAnInvite"
</script>

<li
	class="border-b border-white/5 p-4"
	transition:fly={{ x: 64, duration: 500 }}
>
	{#if eventType === "userJoined"}
		{#if event.expand.user.id === user.id}
			<p>
				Welcome <UserTooltipInfo user={event.expand.user} />. You have
				successfully joined this fantastic website. We hope you have a
				fabulous time here.
			</p>
		{:else}
			<p>
				<UserTooltipInfo user={event.expand.user} />
				has successfully joined this website.
			</p>
		{/if}
	{:else if eventType === "userJoinedByAnInvite"}
		{#if event.expand.user.id === user.id}
			<p>
				Welcome, <UserTooltipInfo user={event.expand.user} />. You have
				successfully joined this fantastic website. We hope you have a
				fabulous time here. User <UserTooltipInfo
					user={event.expand.inviter}
				/> has invited you, and now they have 4 invites.
			</p>
		{:else}
			<p>
				User <UserTooltipInfo user={event.expand.inviter} /> has invited
				<UserTooltipInfo user={event.expand.user} />, and now they have
				4 invites.
			</p>
		{/if}
	{/if}
</li>

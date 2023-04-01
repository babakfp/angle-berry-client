<script>
	import Tooltip from "$lib/Tooltip.svelte"
	import TooltipWrapper from "$lib/TooltipWrapper.svelte"

	export let user
	let isVisible
</script>

<TooltipWrapper>
	<div
		class="underline decoration-dotted decoration-1"
		on:pointerenter={() => (isVisible = true)}
		on:pointerleave={() => (isVisible = false)}
	>
		{user.username}
	</div>
	<Tooltip
		{isVisible}
		position="top-left"
		parentElementQuerySelector="#EventsMenu"
		keepAlive={true}
	>
		<ul class="list-inside list-disc space-y-1">
			<li>Invites: {user.invitedUsers.length}</li>
			<li>
				Tiers:
				{#each user.expand.retainedTiers as tier, i}
					<a class="link" href="/tiers/{tier.id}">
						{tier.name}</a
					>{user.expand.retainedTiers.length - 1 !== i ? " " : ""}
				{/each}
			</li>
		</ul>
	</Tooltip>
</TooltipWrapper>

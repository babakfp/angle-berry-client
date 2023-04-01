<script>
	import { getContext } from "svelte"
	import Tooltip from "$lib/Tooltip.svelte"
	import TooltipWrapper from "$lib/TooltipWrapper.svelte"

	export let user
	let isVisible
	let allTiers = []

	if (user.expand.retainedTiers) {
		user.expand.retainedTiers.forEach(tier => {
			allTiers.push(tier.name)
		})
	}

	getContext("tiers").forEach(tier => {
		if (
			user.invitedUsers.length >= tier.invites &&
			!allTiers.includes(tier.name)
		) {
			allTiers.push(tier.name)
		}
	})
</script>

<TooltipWrapper>
	<span
		class="underline decoration-dotted decoration-1"
		on:pointerenter={() => (isVisible = true)}
		on:pointerleave={() => (isVisible = false)}
	>
		{user.username}
	</span>
	<Tooltip
		{isVisible}
		position="top-left"
		parentElementQuerySelector="#EventsMenu"
	>
		<ul>
			<li>Invites: {user.invitedUsers.length}</li>
			<li class="lowercase">Tiers: {allTiers.join(", ")}</li>
		</ul>
	</Tooltip>
</TooltipWrapper>

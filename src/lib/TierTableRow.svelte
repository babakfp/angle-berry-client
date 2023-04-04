<script>
	import { page } from "$app/stores"

	export let currentTier
	export let isShowingSingleTier = false

	// Does current user has access to this tier
	const hasAccess =
		$page.data.user.retainedTiers.includes(currentTier.id) ||
		$page.data.user.invitedUsers.length >= currentTier.invites
</script>

<tr
	class="group relative duration-200
	{!isShowingSingleTier &&
		'hover:bg-white/5 not-last:border-b not-last:border-white/5'}"
>
	<th class="px-6 py-4">
		<span class="text-white">
			{currentTier.name}{hasAccess && !isShowingSingleTier ? ":" : ""}
		</span>
		{#if hasAccess && !isShowingSingleTier}
			<span class="underline duration-200 group-hover:text-white">
				Watch now
			</span>
		{/if}
	</th>
	<td
		class="px-6 py-4 {($page.data.user.retainedTiers.includes(
			currentTier.id
		) ||
			$page.data.user.invitedUsers.length >= currentTier.invites) &&
			!isShowingSingleTier &&
			'duration-200'}"
	>
		{currentTier.price === 0 ? "Free" : "$" + currentTier.price}
	</td>
	<td
		class="px-6 py-4 {($page.data.user.retainedTiers.includes(
			currentTier.id
		) ||
			$page.data.user.invitedUsers.length >= currentTier.invites) &&
			!isShowingSingleTier &&
			'duration-200'}"
	>
		{currentTier.invites === 0 ? "Free" : currentTier.invites}
	</td>
	<td class="p-0 text-right">
		{#if hasAccess}
			<span class="px-6 py-4">_</span>
		{:else}
			<a
				class="link relative z-1 block px-6 py-4 outline-inset"
				href="/how-to-pay"
			>
				Get access
			</a>
		{/if}
	</td>
	<td class="p-0 text-right">
		{#if hasAccess}
			<span class="px-6 py-4">_</span>
		{:else}
			<a
				class="link relative z-1 block px-6 py-4 outline-inset"
				href="/how-to-invite"
			>
				Start inviting
			</a>
		{/if}
	</td>

	{#if !isShowingSingleTier}
		<a
			class="absolute inset-0 outline-inset"
			href="/tiers/{currentTier.id}"
		/>
	{/if}
</tr>

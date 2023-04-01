<script>
	export let currentTier
	export let userTiers
	export let isShowingAllTiers = null
	export let invitedUsersLength
</script>

<tr
	class="group relative duration-200
	{isShowingAllTiers &&
		'hover:bg-white/5 not-last:border-b not-last:border-white/5'}"
>
	<th class="px-6 py-4">
		<span class="text-white">
			{currentTier.name}{(userTiers.includes(currentTier.id) ||
				invitedUsersLength >= currentTier.invites) &&
			isShowingAllTiers
				? ":"
				: ""}
		</span>
		{#if (userTiers.includes(currentTier.id) || invitedUsersLength >= currentTier.invites) && isShowingAllTiers}
			<span class="underline duration-200 group-hover:text-white">
				Watch now
			</span>
		{/if}
	</th>
	<td
		class="px-6 py-4 {(userTiers.includes(currentTier.id) ||
			invitedUsersLength >= currentTier.invites) &&
			isShowingAllTiers &&
			'duration-200'}"
	>
		{currentTier.price === 0 ? "Free" : "$" + currentTier.price}
	</td>
	<td
		class="px-6 py-4 {(userTiers.includes(currentTier.id) ||
			invitedUsersLength >= currentTier.invites) &&
			isShowingAllTiers &&
			'duration-200'}"
	>
		{currentTier.invites === 0 ? "Free" : currentTier.invites}
	</td>
	<td class="p-0 text-right">
		{#if userTiers.includes(currentTier.id) || invitedUsersLength >= currentTier.invites}
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
		{#if userTiers.includes(currentTier.id) || invitedUsersLength >= currentTier.invites}
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

	{#if isShowingAllTiers}
		<a
			class="absolute inset-0 outline-inset"
			href="/tiers/{currentTier.id}"
		/>
	{/if}
</tr>

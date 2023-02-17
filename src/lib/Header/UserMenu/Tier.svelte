<script>
	export let tier
	export let user
</script>

<li class="relative">
	<a
		class="group flex items-center justify-between gap-4 py-2 px-4 -outline-offset-2 duration-300 hover:text-white"
		href="/tiers/{tier.id}"
	>
		<div class="flex items-center gap-3">
			<div
				class="h-1 w-1 rounded-full bg-gray-500 duration-300 group-hover:bg-white"
			/>
			<span class="underline">
				{tier.name}
			</span>
		</div>
		<div>
			{#if user.retainedTiers.includes(tier.id) || user.invitedUsers.length >= tier.invites}
				<span>Watch now</span>
			{:else}
				<span class="group-hover:hidden">Locked</span>
				<span class="hidden group-hover:inline-block">Unlock?</span>
			{/if}
		</div>
	</a>
</li>

<style lang="postcss">
	li:first-of-type a {
		@apply pt-4;
	}
	li:last-of-type a {
		@apply pb-4;
	}
</style>

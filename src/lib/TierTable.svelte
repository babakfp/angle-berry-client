<script>
	import TierTableRow from "$lib/TierTableRow.svelte"

	export let allTiers = null
	export let currentTier = null
	export let userTiers
	export let invitedUsersLength
	export let className = ""
	export { className as class }

	const isShowingAllTiers = !!allTiers
</script>

<div class="{className} overflow-x-auto whitespace-nowrap rounded shadow-md">
	<table class="w-full text-left text-sm text-gray-400">
		<thead class="bg-white/10 text-xs uppercase">
			<tr>
				<th class="px-6 py-3 pt-3.5">TIER NAME</th>
				<th class="px-6 py-3 pt-3.5">PRICE</th>
				<th class="px-6 py-3 pt-3.5">INVITES</th>
				<th class="px-6 py-3 pt-3.5 text-right">PAYING</th>
				<th class="px-6 py-3 pt-3.5 text-right">INVITING</th>
			</tr>
		</thead>
		<tbody>
			{#if isShowingAllTiers}
				{#each allTiers as tier}
					<TierTableRow
						currentTier={tier}
						{userTiers}
						{invitedUsersLength}
						{isShowingAllTiers}
					/>
				{/each}
			{:else}
				<TierTableRow {currentTier} {userTiers} {invitedUsersLength} />
			{/if}
		</tbody>
	</table>
</div>

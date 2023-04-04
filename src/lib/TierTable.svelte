<script>
	import { page } from "$app/stores"
	import TierTableRow from "$lib/TierTableRow.svelte"

	export let currentTier = null
	export let className = ""
	export { className as class }

	const isShowingAllTiers = !!$page.data.tiers
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
				{#each $page.data.tiers as tier}
					<TierTableRow currentTier={tier} {isShowingAllTiers} />
				{/each}
			{:else}
				<TierTableRow {currentTier} />
			{/if}
		</tbody>
	</table>
</div>

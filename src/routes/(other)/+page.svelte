<script>
	import TierTable from "$lib/TierTable.svelte"
	import { getPreviewTier } from "$lib/getPreviewTier.js"
	export let data
</script>

<svelte:head>
	<title>Angle Berry</title>
</svelte:head>

<p>
	You can <a class="link" href="/tiers/{getPreviewTier(data.tiers).id}">
		watch free content here
	</a>
	and for more content, you can get the following tiers:
</p>

<TierTable
	class="mt-8"
	allTiers={data?.tiers}
	userTiers={data?.user.retainedTiers}
	invitedUsersLength={data?.user.invitedUsers.length}
/>

<div class="mt-8">
	<!-- prettier-ignore -->
	<p>
		You can get the premium tiers by <a class="link" href="/how-to-pay">paying</a> or
		<a class="link" href="/how-to-invite">inviting</a> new users to this website.
	</p>

	<p>
		You can contact us via Telegram
		<a class="link" href="https://t.me/adminTelegramUsername">
			@adminTelegramUsername
		</a>
	</p>
</div>

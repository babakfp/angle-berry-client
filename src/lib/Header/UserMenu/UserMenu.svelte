<script>
	import OutClick from "svelte-outclick"
	import { copy } from "svelte-copy"
	import toast, { Toaster } from "svelte-french-toast"
	import { onMount } from "svelte"
	import { page } from "$app/stores"
	import { beforeNavigate } from "$app/navigation"
	import Tier from "./Tier.svelte"

	export let user
	export let tiers
	export let userMenuToggle
	export let isUserMenuOpen = false

	beforeNavigate(() => (isUserMenuOpen = false))
	onMount(() =>
		document.addEventListener("mouseleave", () => (isUserMenuOpen = false))
	)
</script>

<svelte:window on:scroll={() => (isUserMenuOpen = false)} />

<OutClick
	on:outclick={() => (isUserMenuOpen = false)}
	excludeElements={userMenuToggle}
>
	<ul
		id="UserMenu"
		class="absolute top-full right-0 w-60 translate-x-full overflow-y-auto rounded bg-gray-800 text-sm shadow-[0_4px_16px_0_rgb(0_0_0/0.4)] duration-300 hide
		{isUserMenuOpen && '!-translate-x-4 !show'}"
	>
		<li>
			<a
				class="flex items-center justify-between rounded-t p-4 duration-300 outline-inset hover:text-white"
				href="/how-to-invite"
				type="button"
			>
				<span>
					Invites: {user.invitedUsers.length}
				</span>
				<span class="underline">Start inviting</span>
			</a>
		</li>

		<li use:copy={`${$page.url.origin}/register?id=${user.id}`}>
			<button
				class="bg-[black] p-4 outline-inset"
				on:click={() =>
					toast.success("Your invite link is copied to Clipboard.", {
						position: "bottom-right",
					})}
			>
				<span>Click to copy your invite link:</span>
				<!-- Removed `select-text` class because it's buggy -->
				<p class="mt-1 select-text leading-4 text-gray-500">
					{$page.url.origin}/register?id={user.id}
				</p>
			</button>
		</li>

		<nav class="max-h-64 overflow-y-auto">
			<ol>
				{#each tiers as tier}
					<Tier {tier} {user} />
				{/each}
			</ol>
		</nav>

		<li class="border-t border-white/5">
			<form action="/logout" method="POST">
				<button
					class="w-full rounded-b p-4 text-left duration-300 outline-inset hover:text-white"
				>
					Logout
				</button>
			</form>
		</li>
	</ul>
</OutClick>

<Toaster />

<style lang="postcss">
	#UserMenu {
		max-height: calc(
			100vh - theme(spacing.header-height) - theme(spacing.8)
		);
		max-height: calc(
			100dvh - theme(spacing.header-height) - theme(spacing.8)
		);
	}
</style>

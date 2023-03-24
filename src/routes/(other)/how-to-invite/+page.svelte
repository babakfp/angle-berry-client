<script>
	import { page } from "$app/stores"
	import Input from "$lib/Form/Input.svelte"
	import { copy } from "svelte-copy"
	import toast, { Toaster } from "svelte-french-toast"

	export let data
</script>

<svelte:head>
	<title>How to invite</title>
</svelte:head>

<h1 class="font-bold text-4xl text-white">How to invite</h1>

<div class="mt-8 space-y-4">
	<Input
		type="text"
		value="{$page.url.origin}/register?id={data.user.id}"
		name="userInviteLink"
		label="Your invite link"
		readonly
	>
		<button
			slot="under-input"
			class="absolute inset-y-0 right-0 flex w-14 items-center justify-center rounded text-2xs outline-inset"
			type="button"
			use:copy={`${$page.url.origin}/register?id=${data.user.id}`}
			on:click={() =>
				toast.success("Your invite link is copied to Clipboard.", {
					position: "bottom-right",
				})}
		>
			Copy
		</button>
	</Input>
	<p>
		You can share your invite link with your friends or on social media
		platforms. When someone registers on our website with your invite link,
		you will get a point added to your invites.
	</p>
</div>

<Toaster />

<script>
	import { onMount, setContext } from "svelte"
	import { fly } from "svelte/transition"
	import { page } from "$app/stores"
	import PocketBase from "pocketbase"
	import { PUBLIC_POCKETBASE_URL } from "$env/static/public"
	import { pageTransitionValues } from "$lib/pageTransitionValues.js"
	import Header from "$lib/Header/Header.svelte"
	import { messages, unreadMessagesLength } from "$lib/messages.js"
	import { events, unseenEventsLength } from "$lib/events.js"
	import { error } from "@sveltejs/kit"
	import { handlePbConnectionIssue } from "$lib/handlePbConnectionIssue.js"

	export let data
	setContext("tiers", data.tiers)

	const pb = new PocketBase(PUBLIC_POCKETBASE_URL)
	setContext("pb", pb)

	onMount(async () => {
		try {
			await pb
				.collection("messages")
				.subscribe("*", async ({ action, record }) => {
					if (action === "create") {
						const userRecord = await pb
							.collection("users")
							.getOne(record.user)
						let repliedToRecord
						if (record.repliedTo) {
							repliedToRecord = await pb
								.collection("messages")
								.getOne(record.repliedTo)
						}
						record.expand = {
							user: structuredClone(userRecord),
							repliedTo: repliedToRecord
								? structuredClone(repliedToRecord)
								: undefined,
						}
						messages.update(v => [record, ...v])
						unreadMessagesLength.update(v => (v += 1))
					} else if (action === "delete") {
						messages.update(v => v.filter(m => m.id !== record.id))
						unreadMessagesLength.update(v => (v -= 1))
					}
				})
			await pb
				.collection("events")
				.subscribe("*", async ({ action, record }) => {
					if (action === "create") {
						const userRecord = await pb
							.collection("users")
							.getOne(record.user, {
								expand: "retainedTiers",
							})
						const inviterRecord = await pb
							.collection("users")
							.getOne(record.inviter, {
								expand: "retainedTiers",
							})
						record.expand = {
							user: structuredClone(userRecord),
							inviter: structuredClone(inviterRecord),
						}
						events.update(v => [record, ...v])
						unseenEventsLength.update(v => (v += 1))
					} else if (action === "delete") {
						events.update(v => v.filter(m => m.id !== record.id))
						unseenEventsLength.update(v => (v -= 1))
					}
				})
		} catch ({ status, response }) {
			handlePbConnectionIssue(status)
			throw error(status, response.message)
		}
	})
</script>

<Header {data} user={data?.user} tiers={data?.tiers} />

{#key $page.url.pathname}
	<main
		class="min-h-dscreen-header container grid content-start items-start py-12"
		in:fly={pageTransitionValues}
	>
		<slot />
	</main>
{/key}

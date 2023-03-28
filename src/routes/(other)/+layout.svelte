<script>
	import { onMount, setContext } from "svelte"
	import { fly } from "svelte/transition"
	import { page } from "$app/stores"
	import { pageTransitionValues } from "$lib/pageTransitionValues.js"
	import { messages, unreadMessagesLength } from "$lib/messages.js"
	import { events, unseenEventsLength } from "$lib/events.js"
	import { error } from "@sveltejs/kit"
	import { handlePbConnectionIssue } from "$lib/handlePbConnectionIssue.js"
	import { pb } from "$lib/pb.js"
	import Header from "$lib/Header/Header.svelte"

	export let data
	setContext("tiers", data.tiers)

	onMount(async () => {
		try {
			await $pb
				.collection("messages")
				.subscribe("*", async ({ action, record }) => {
					if (action === "update") {
						messages.update(msgs => {
							msgs.map(msg => {
								if (msg.id === record.id) {
									msg.content = record.content
									msg.updated = record.updated
								}
								if (msg.expand?.repliedTo?.id === record.id) {
									msg.expand.repliedTo.content =
										record.content
									msg.expand.repliedTo.updated =
										record.updated
								}
							})
							return msgs
						})
					} else if (action === "create") {
						const userRecord = await $pb
							.collection("users")
							.getOne(record.user)
						let repliedToRecord
						if (record.repliedTo) {
							repliedToRecord = await $pb
								.collection("messages")
								.getOne(record.repliedTo, { expand: "user" })
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
			await $pb
				.collection("events")
				.subscribe("*", async ({ action, record }) => {
					if (action === "create") {
						const userRecord = await $pb
							.collection("users")
							.getOne(record.user, {
								expand: "retainedTiers",
							})
						const inviterRecord = await $pb
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
		class="container grid min-h-[calc(var(--hscreen)-var(--header-height))] content-start items-start py-12"
		in:fly={pageTransitionValues}
	>
		<slot />
	</main>
{/key}

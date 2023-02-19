import { redirect, error } from "@sveltejs/kit"
import { handlePbConnectionIssue } from "$lib/handlePbConnectionIssue.js"

export async function load({ locals }) {
	if (!locals.user) throw redirect(303, "/login")

	try {
		const tiersRecords = await locals.pb.collection("tiers").getFullList(10)
		const messagesRecords = await locals.pb
			.collection("messages")
			.getList(1, 50, {
				sort: "-created",
				expand: "user",
			})
		const eventsRecords = await locals.pb
			.collection("events")
			.getList(1, 50, {
				sort: "-created",
				expand: "user,user.retainedTiers,inviter,inviter.retainedTiers",
			})

		return {
			tiers: structuredClone(tiersRecords),
			messages: structuredClone(messagesRecords).items,
			events: structuredClone(eventsRecords).items,
		}
	} catch ({ status, data }) {
		handlePbConnectionIssue(status)
		throw error(status, data.message)
	}
}

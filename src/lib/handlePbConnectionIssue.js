import { error } from "@sveltejs/kit"

export function handlePbConnectionIssue(status) {
	if (status === 0) {
		throw error(500, "Unable to communicate with the database.")
	}
}

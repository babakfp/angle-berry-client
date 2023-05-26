import { error } from "@sveltejs/kit"

export function handlePbConnectionIssue(status) {
    if (status === 0) {
        throw error(
            500,
            "Sorry, we were unable to communicate with the database."
        )
    }
}

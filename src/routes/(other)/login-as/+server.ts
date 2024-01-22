import { redirect } from "@sveltejs/kit"

const auth = {
    user: {
        username: "demo",
        password: "demodemo",
    },
    admin: {
        username: "babakfp",
        password: "th_&filter=&sort=-cr",
    },
}

export function GET() {
    redirect(303, "/")
}

export async function POST({ locals }) {
    if (!locals.user) redirect(303, "/login")

    if (locals.user.isAdmin) {
        await locals.pb
            .collection("users")
            .authWithPassword(auth.user.username, auth.user.password)
    } else {
        await locals.pb
            .collection("users")
            .authWithPassword(auth.admin.username, auth.admin.password)
    }

    redirect(303, "/")
}

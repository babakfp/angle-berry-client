import { redirect } from "@sveltejs/kit"

const auth = {
    user: {
        username: "user",
        password: "useruser",
    },
    admin: {
        username: "admin",
        password: "adminadmin",
    },
}

export const GET = async ({ locals }) => {
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

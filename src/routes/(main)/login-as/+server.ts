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

export const GET = ({ locals }) => {
    if (!locals.loggedInUser) {
        redirect(303, "/login")
    }
    redirect(303, "/")
}

export const POST = async ({ locals }) => {
    if (!locals.loggedInUser) {
        redirect(303, "/login")
    }
    if (locals.loggedInUser.isAdmin) {
        locals.pb.authStore.clear()
        locals.loggedInUser = undefined

        await locals.pb
            .collection("users")
            .authWithPassword(auth.user.username, auth.user.password)
    } else {
        locals.pb.authStore.clear()
        locals.loggedInUser = undefined

        await locals.pb
            .collection("users")
            .authWithPassword(auth.admin.username, auth.admin.password)
    }

    redirect(303, "/")
}

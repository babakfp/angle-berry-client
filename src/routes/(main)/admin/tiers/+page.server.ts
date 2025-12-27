import { error, fail, redirect } from "@sveltejs/kit"
import { superValidate } from "sveltekit-superforms/server"
import {
    ClientResponseError,
    pbHandleClientResponseError,
    pbHandleFormActionError,
} from "$lib/utilities/pb"
import type { Actions, PageServerLoad } from "./$types"
import { schema } from "./schema"

export const load: PageServerLoad = async ({ locals }) => {
    if (!locals.loggedInUser) redirect(303, "/login")
    if (!locals.loggedInUser.isAdmin)
        error(401, "You are not authorized to see this page!")

    const form = await superValidate(schema.delete.multiple)

    try {
        const [tiers, users] = await Promise.all([
            locals.pb
                .collection("tiers")
                .getFullList({ requestKey: "tiers-get-full-list" }),
            locals.pb.collection("users").getFullList(),
        ])
        return { form, tiers, users }
    } catch (e) {
        if (e instanceof ClientResponseError) {
            pbHandleClientResponseError(e)
        }
        throw e
    }
}

export const actions = {
    delete: async ({ locals, request }) => {
        if (!locals.loggedInUser) redirect(303, "/login")
        if (!locals.loggedInUser.isAdmin)
            error(401, "You are not authorized to perform this action!")

        const form = await superValidate(request, schema.delete.multiple)

        if (!form.valid) {
            return fail(400, { form })
        }

        try {
            await Promise.all(
                form.data.ids.map((id) =>
                    locals.pb.collection("tiers").delete(id),
                ),
            )
        } catch (e) {
            return pbHandleFormActionError(e, { form })
        }
    },
} satisfies Actions

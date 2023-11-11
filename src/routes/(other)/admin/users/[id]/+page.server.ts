import { redirect, error, fail } from "@sveltejs/kit"
import {
    pbHandleClientResponseError,
    pbHandleFormActionError,
} from "$utilities/pb"
import { superValidate } from "sveltekit-superforms/server"
import type { UsersResponse, ClientResponseError } from "$utilities/pb-types"
import { schema } from "./schema"

export async function load({ locals, params }) {
    if (!locals.user) throw redirect(303, "/login")
    if (!locals.user.isAdmin)
        throw error(401, "You are not authorized to see this page!")

    const form = await superValidate(schema)

    try {
        const user: UsersResponse = await locals.pb
            .collection("users")
            .getOne(params.id)
        return { form, user }
    } catch (e) {
        pbHandleClientResponseError(e as ClientResponseError)
        throw e
    }
}

// export const actions = {
//     default: async ({ locals, request, params }) => {
//         if (!locals.user) throw redirect(303, "/login")
//         if (!locals.user.isAdmin)
//             throw error(401, "You are not authorized to see this page!")

//         const form = await superValidate(request, schema)
//         if (!form.valid) return fail(400, { form })

//         try {
//             await locals.pb.collection("tiers").update(params.id, form.data)
//         } catch (e) {
//             const e2 = pbHandleFormActionError(e, form)
//             if (e2) return e2
//             throw e
//         }

//         throw redirect(303, "/admin/tiers")
//     },
// }

import { isUserACreatedBeforeUserB } from "@/lib/utilities/isUserACreatedBeforeUserB"
import {
    pbHandleClientResponseError,
    pbHandleFormActionError,
} from "@/lib/utilities/pb/helpers"
import {
    ClientResponseError,
    type UsersResponse,
} from "@/lib/utilities/pb/types"
import { error, fail, redirect } from "@sveltejs/kit"
import { setError, superValidate } from "sveltekit-superforms/server"
import { schema } from "./schema"

export const load = async ({ locals, params }) => {
    if (!locals.user) redirect(303, "/login")
    if (!locals.user.isAdmin)
        error(401, "You are not authorized to see this page!")

    const form = await superValidate(schema)

    try {
        const userToEdit: UsersResponse = await locals.pb
            .collection("users")
            .getOne(params.id)
        return { form, userToEdit }
    } catch (e) {
        if (e instanceof ClientResponseError) {
            pbHandleClientResponseError(e)
        }
        throw e
    }
}

export const actions = {
    default: async ({ locals, request, params }) => {
        if (!locals.user) redirect(303, "/login")
        if (!locals.user.isAdmin)
            error(401, "You are not authorized to perform this action!")

        const form = await superValidate(request, schema)
        if (!form.valid) return fail(400, { form })

        const userToEdit: UsersResponse = await locals.pb
            .collection("users")
            .getOne(params.id)

        if (
            locals.user.id !== userToEdit.id &&
            userToEdit.isAdmin &&
            !isUserACreatedBeforeUserB(locals.user, userToEdit)
        ) {
            return setError(
                form,
                "You cannot modify the data of a super admin account.",
            )
        }

        // Is admin role changed?
        if (form.data.isAdmin !== userToEdit.isAdmin) {
            // Is logged in user the same as the user being edited?
            if (locals.user.id === userToEdit.id) {
                return setError(
                    form,
                    "isAdmin",
                    "You cannot modify your own admin role.",
                )
            }
        }

        try {
            await locals.pb.collection("users").update(params.id, form.data)
        } catch (e) {
            const e2 = pbHandleFormActionError(e, form)
            if (e2) return e2
            throw e
        }

        redirect(303, "/admin/users")
    },
}

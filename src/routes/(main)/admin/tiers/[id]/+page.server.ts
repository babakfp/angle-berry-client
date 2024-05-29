import { error, fail, redirect } from "@sveltejs/kit"
import { superValidate } from "sveltekit-superforms/server"
import {
    pbHandleClientResponseError,
    pbHandleFormActionError,
} from "@/lib/utilities/pb/helpers"
import {
    ClientResponseError,
    type TiersResponse,
    type VideosResponse,
} from "@/lib/utilities/pb/types"
import { schema } from "../schema"

export const load = async ({ locals, params }) => {
    if (!locals.loggedInUser) redirect(303, "/login")
    if (!locals.loggedInUser.isAdmin)
        error(401, "You are not authorized to see this page!")

    const formUpdate = await superValidate(schema.update)
    const formDelete = await superValidate(schema.delete.single)

    try {
        const tier: TiersResponse = await locals.pb
            .collection("tiers")
            .getOne(params.id)
        const videos: VideosResponse[] = await locals.pb
            .collection("videos")
            .getFullList()
        return { formUpdate, formDelete, tier, videos }
    } catch (e) {
        if (e instanceof ClientResponseError) {
            pbHandleClientResponseError(e)
        }
        throw e
    }
}

export const actions = {
    update: async ({ locals, request, params }) => {
        if (!locals.loggedInUser) redirect(303, "/login")
        if (!locals.loggedInUser.isAdmin)
            error(401, "You are not authorized to perform this action!")

        const formUpdate = await superValidate(request, schema.update)
        if (!formUpdate.valid) return fail(400, { formUpdate })

        try {
            await locals.pb
                .collection("tiers")
                .update(params.id, formUpdate.data)
        } catch (e) {
            const e2 = pbHandleFormActionError(e, formUpdate)
            if (e2) return e2
            throw e
        }

        redirect(303, "/admin/tiers")
    },
    delete: async ({ locals, request, params }) => {
        if (!locals.loggedInUser) redirect(303, "/login")
        if (!locals.loggedInUser.isAdmin)
            error(401, "You are not authorized to perform this action!")

        const formDelete = await superValidate(request, schema.delete.single)
        if (!formDelete.valid) return fail(400, { formDelete })

        try {
            await locals.pb.collection("tiers").delete(params.id)
        } catch (e) {
            const e2 = pbHandleFormActionError(e, formDelete)
            if (e2) return e2
            throw e
        }

        redirect(303, "/admin/tiers")
    },
}

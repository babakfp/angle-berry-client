import { redirect, error, fail } from "@sveltejs/kit"
import {
    pbHandleClientResponseError,
    pbHandleFormActionError,
} from "$utilities/pb"
import { superValidate } from "sveltekit-superforms/server"
import type {
    TiersResponse,
    VideosResponse,
    ClientResponseError,
} from "$utilities/pb-types"
import { formSchemaUpdateTier, formSchemaDeleteTier } from "../schema"

export async function load({ locals, params }) {
    if (!locals.user) throw redirect(303, "/login")
    if (!locals.user.isAdmin)
        throw error(401, "You are not authorized to see this page!")

    const formUpdate = await superValidate(formSchemaUpdateTier)
    const formDelete = await superValidate(formSchemaDeleteTier)

    try {
        const tier: TiersResponse = await locals.pb
            .collection("tiers")
            .getOne(params.id)
        const videos: VideosResponse[] = await locals.pb
            .collection("videos")
            .getFullList()
        return { formUpdate, formDelete, tier, videos }
    } catch (e) {
        pbHandleClientResponseError(e as ClientResponseError)
        throw e
    }
}

export const actions = {
    update: async ({ locals, request, params }) => {
        if (!locals.user) throw redirect(303, "/login")
        if (!locals.user.isAdmin)
            throw error(401, "You are not authorized to perform this action!")

        const formUpdate = await superValidate(request, formSchemaUpdateTier)
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

        throw redirect(303, "/admin/tiers")
    },
    delete: async ({ locals, request, params }) => {
        if (!locals.user) throw redirect(303, "/login")
        if (!locals.user.isAdmin)
            throw error(401, "You are not authorized to perform this action!")

        const formDelete = await superValidate(request, formSchemaDeleteTier)
        if (!formDelete.valid) return fail(400, { formDelete })

        try {
            await locals.pb.collection("tiers").delete(params.id)
        } catch (e) {
            const e2 = pbHandleFormActionError(e, formDelete)
            if (e2) return e2
            throw e
        }

        throw redirect(303, "/admin/tiers")
    },
}

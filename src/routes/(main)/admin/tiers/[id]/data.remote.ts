import { invalid, redirect } from "@sveltejs/kit"
import * as v from "valibot"
import { form, getRequestEvent, query } from "$app/server"
import { pbHandleError, pbInvalid } from "$lib/utilities/pb"
import { schema } from "../schema"

export const loadTier = query(v.string(), async (id) => {
    const { locals } = getRequestEvent()

    if (!locals.loggedInUser) {
        redirect(401, "/login")
    }
    if (!locals.loggedInUser.isAdmin) {
        redirect(401, "/")
    }

    try {
        return await locals.pb.collection("tiers").getOne(id)
    } catch (e) {
        throw pbHandleError(e)
    }
})

export const updateTier = form(schema.update, async (data, issue) => {
    const { locals, params } = getRequestEvent()

    if (!locals.loggedInUser) {
        redirect(401, "/login")
    }
    if (!locals.loggedInUser.isAdmin) {
        redirect(401, "/")
    }

    // TODO: get userid from schema insetad of params?
    const tierId = params.id

    if (!tierId) {
        invalid("Tier ID is required!")
    }

    try {
        await locals.pb.collection("tiers").update(tierId, data)
    } catch (e) {
        pbInvalid(e, issue)
    }

    return {
        redirect: "/admin/tiers",
    } as const
})

export const deleteTier = form(schema.delete.single, async (data, issue) => {
    const { locals } = getRequestEvent()

    if (!locals.loggedInUser) {
        redirect(401, "/login")
    }
    if (!locals.loggedInUser.isAdmin) {
        redirect(401, "/")
    }

    try {
        await locals.pb.collection("tiers").delete(data.id)
    } catch (e) {
        pbInvalid(e, issue)
    }

    return {
        redirect: "/admin/tiers",
    } as const
})

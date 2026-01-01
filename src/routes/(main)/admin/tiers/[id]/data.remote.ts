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

export const updateTier = form(
    schema.update,
    async ({ id, ...data }, issue) => {
        const { locals } = getRequestEvent()

        if (!locals.loggedInUser) {
            invalid("You are not logged in!")
        }
        if (!locals.loggedInUser.isAdmin) {
            invalid("You are not an admin!")
        }

        try {
            await locals.pb.collection("tiers").update(id, data)
        } catch (e) {
            pbInvalid(e, issue)
        }

        return {
            redirect: "/admin/tiers",
        } as const
    },
)

export const deleteTier = form(schema.delete.single, async (data, issue) => {
    const { locals } = getRequestEvent()

    if (!locals.loggedInUser) {
        invalid("You are not logged in!")
    }
    if (!locals.loggedInUser.isAdmin) {
        invalid("You are not an admin!")
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

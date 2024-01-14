import type PocketBase from "pocketbase"
import type { UsersResponse } from "$utilities/pb-types"

declare global {
    namespace App {
        interface Locals {
            pb: PocketBase
            user?: UsersResponse
            tiers: TiersResponse[]
            previewTierId?: string
        }
        interface PageData {
            // TODO: I don't know how to specify that the type can be `undefined` inside `(auth)` routes and ensure that it will be available inside `(other)` routes.
            user: UsersResponse // Is `undefined` inside `(auth)` routes.
            tiers: TiersResponse[]
            previewTierId?: string
        }
    }
}

export {}

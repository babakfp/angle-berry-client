import type { TypedPocketBase, UsersResponse } from "$lib/utilities/pb/types"

declare global {
    namespace App {
        interface Locals {
            pb: TypedPocketBase
            loggedInUser?: UsersResponse
            previewTierId?: string
        }
        interface Error {
            type?: "failure"
        }
    }
}

export {}

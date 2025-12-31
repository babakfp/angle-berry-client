import type { PocketBaseType, UsersResponse } from "$lib/utilities/pb"

declare global {
    namespace App {
        interface Locals {
            pb: PocketBaseType
            loggedInUser?: UsersResponse
            previewTierId?: string
        }
    }
}

export {}

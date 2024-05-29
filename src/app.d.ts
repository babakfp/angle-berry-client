import type PocketBase from "pocketbase"
import type { UsersResponse } from "@/lib/utilities/pb/types"

declare global {
    namespace App {
        interface Locals {
            pb: PocketBase
            loggedInUser?: UsersResponse
            previewTierId?: string
        }
        interface Error {
            type?: "failure"
        }
    }
}

export {}

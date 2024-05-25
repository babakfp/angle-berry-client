import type { UsersResponse } from "@/lib/utilities/pb/types"
import type PocketBase from "pocketbase"

declare global {
    namespace App {
        interface Locals {
            pb: PocketBase
            user?: UsersResponse
            previewTierId?: string
        }
    }
}

export {}

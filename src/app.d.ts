import PocketBase from "pocketbase"
import type { UsersResponse } from "$utilities/pb-types"

declare global {
    namespace App {
        interface Locals {
            pb: PocketBase
            user: UsersResponse | null
        }
    }
}

export {}

import type { UsersResponse } from "@/lib/utilities/pb/types"

export const isUserACreatedBeforeUserB = (
    userA: UsersResponse,
    userB: UsersResponse,
) => {
    return new Date(userA.created).getTime() < new Date(userB.created).getTime()
}

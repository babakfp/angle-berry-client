<script lang="ts">
    import Tooltip from "$lib/components/Tooltip.svelte"
    import TooltipWrapper from "$lib/components/TooltipWrapper.svelte"
    import type { TiersResponse, UsersResponse } from "$lib/utilities/pb"

    let isVisible = $state(false)

    let {
        user,
    }: {
        user: UsersResponse & {
            expand: {
                retainedTiers: TiersResponse[]
            }
        }
    } = $props()
</script>

<TooltipWrapper>
    <div
        class="before:absolute before:inset-x-0 before:bottom-0 before:-z-1 before:block before:h-2 before:bg-gray-50/10"
        onpointerenter={() => (isVisible = true)}
        onpointerleave={() => (isVisible = false)}
    >
        {user.username}
    </div>
    <Tooltip
        {isVisible}
        position="top-left"
        parentElementQuerySelector="#EventsMenu"
        keepAlive={true}
    >
        <ul class="list-inside list-disc space-y-1">
            <li>Invites: {user.invitedUsers.length}</li>
            <li>
                Tiers:
                {#each user.expand.retainedTiers as tier, i}
                    <a class="link" href="/tiers/{tier.id}">
                        {tier.name}</a
                    >{user.expand.retainedTiers.length - 1 !== i ? " " : ""}
                {/each}
            </li>
        </ul>
    </Tooltip>
</TooltipWrapper>

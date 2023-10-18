<script>
    import Tooltip from "$components/Tooltip.svelte"
    import TooltipWrapper from "$components/TooltipWrapper.svelte"

    export let user
    let isVisible
</script>

<TooltipWrapper>
    <div
        class="before:absolute before:inset-x-0 before:bottom-0 before:-z-1 before:block before:h-2 before:bg-white/10"
        on:pointerenter={() => (isVisible = true)}
        on:pointerleave={() => (isVisible = false)}
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

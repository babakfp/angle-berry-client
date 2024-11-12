<script lang="ts">
    import { fly } from "svelte/transition"
    import type {
        RealtimeEventsResponse,
        UsersResponse,
    } from "$lib/utilities/pb"
    import UserTooltipInfo from "./UserTooltipInfo.svelte"

    let {
        loggedInUser,
        event,
    }: {
        loggedInUser: UsersResponse
        event: RealtimeEventsResponse
    } = $props()
</script>

<li
    class="border-b border-gray-50/5 p-4"
    transition:fly={{ x: 64, duration: 500 }}
>
    {#if !event.expand?.inviter}
        {#if event.expand.user.id === loggedInUser.id}
            <div>
                Welcome <UserTooltipInfo user={event.expand.user} />. You have
                successfully joined this fantastic website. We hope you have a
                fabulous time here.
            </div>
        {:else}
            <div>
                <UserTooltipInfo user={event.expand.user} />
                has successfully joined this website.
            </div>
        {/if}
    {:else if event.expand.user.id === loggedInUser.id}
        <div>
            Welcome, <UserTooltipInfo user={event.expand.user} />. You have
            successfully joined this fantastic website. We hope you have a
            fabulous time here. User <UserTooltipInfo
                user={event.expand.inviter}
            /> has invited you.
        </div>
    {:else}
        <div>
            User <UserTooltipInfo user={event.expand.inviter} /> has invited
            <UserTooltipInfo user={event.expand.user} />.
        </div>
    {/if}
</li>

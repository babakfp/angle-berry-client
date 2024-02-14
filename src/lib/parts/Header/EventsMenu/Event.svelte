<script lang="ts">
    import { fly } from "svelte/transition"
    import type {
        RealtimeEventsResponse,
        UsersResponse,
    } from "$utilities/pb/types"
    import UserTooltipInfo from "./UserTooltipInfo.svelte"

    export let user: UsersResponse
    export let event: RealtimeEventsResponse
</script>

<li
    class="border-b border-white/5 p-4"
    transition:fly={{ x: 64, duration: 500 }}
>
    {#if !event.expand?.inviter}
        {#if event.expand.user.id === user.id}
            <p>
                Welcome <UserTooltipInfo user={event.expand.user} />. You have
                successfully joined this fantastic website. We hope you have a
                fabulous time here.
            </p>
        {:else}
            <p>
                <UserTooltipInfo user={event.expand.user} />
                has successfully joined this website.
            </p>
        {/if}
    {:else if event.expand.user.id === user.id}
        <p>
            Welcome, <UserTooltipInfo user={event.expand.user} />. You have
            successfully joined this fantastic website. We hope you have a
            fabulous time here. User <UserTooltipInfo
                user={event.expand.inviter}
            /> has invited you.
        </p>
    {:else}
        <p>
            User <UserTooltipInfo user={event.expand.inviter} /> has invited
            <UserTooltipInfo user={event.expand.user} />.
        </p>
    {/if}
</li>

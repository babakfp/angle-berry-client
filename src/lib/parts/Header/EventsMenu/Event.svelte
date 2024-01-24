<script lang="ts">
    import { page } from "$app/stores"
    import { fly } from "svelte/transition"
    import type { CustomEventsResponse } from "$utilities/pb-types"
    import UserTooltipInfo from "./UserTooltipInfo.svelte"

    export let event: CustomEventsResponse
</script>

<li
    class="border-b border-white/5 p-4"
    transition:fly={{ x: 64, duration: 500 }}
>
    {#if !event.expand?.inviter}
        {#if event.expand.user.id === $page.data.user.id}
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
    {:else}
        <!-- NOTE: THIS COMMENT PREVENTS PRETTIER FROM COMBINING THE BELOW IF STATEMENT WITH THE ABOVE ELSE STATEMENT -->
        {#if event.expand.user.id === $page.data.user.id}
            <p>
                Welcome, <UserTooltipInfo user={event.expand.user} />. You have
                successfully joined this fantastic website. We hope you have a
                fabulous time here. User <UserTooltipInfo
                    user={event.expand.inviter}
                /> has invited you, and now they have 4 invites.
            </p>
        {:else}
            <p>
                User <UserTooltipInfo user={event.expand.inviter} /> has invited
                <UserTooltipInfo user={event.expand.user} />, and now they have
                4 invites.
            </p>
        {/if}
    {/if}
</li>

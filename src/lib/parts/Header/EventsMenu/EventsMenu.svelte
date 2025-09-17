<script lang="ts">
    import type { Snippet } from "svelte"
    import { fly } from "svelte/transition"
    import Popover from "$lib/components/Popover.svelte"
    import SideDrawer from "$lib/components/SideDrawer.svelte"
    import { events, unseenEventsLength } from "$lib/stores/events.svelte"
    import type {
        ListResult,
        RealtimeEventsResponse,
        TiersResponse,
        UsersResponse,
    } from "$lib/utilities/pb"

    let {
        pbEvents,
        loggedInUser,
        DialogTrigger: MyDialogTrigger,
    }: {
        pbEvents: ListResult<RealtimeEventsResponse>
        loggedInUser: UsersResponse
        DialogTrigger: Snippet
    } = $props()

    events._ = pbEvents

    let ref = $state<HTMLDivElement>()
</script>

<SideDrawer
    title="Events"
    onOpenChange={(details) => {
        if (details.open && unseenEventsLength._) {
            unseenEventsLength._ = 0
        }
    }}
>
    {#snippet DialogTrigger()}
        {@render MyDialogTrigger()}
    {/snippet}

    <div bind:this={ref}>
        {#if events._ && events._.items.length}
            <ol class="overflow-y-auto overscroll-y-contain sm:text-sm">
                {#each events._.items as event (event.id)}
                    {@render Event({ event })}
                {/each}
                <p class="p-4 text-center text-xs text-gray-500">
                    No more events found!
                </p>
            </ol>
        {:else}
            <p class="px-4 py-6 text-center">No events found!</p>
        {/if}
    </div>
</SideDrawer>

{#snippet Event({ event }: { event: RealtimeEventsResponse })}
    <li
        class="border-b border-gray-50/5 p-4"
        transition:fly={{ x: 64, duration: 500 }}
    >
        {#if !event.expand?.inviter}
            {#if event.expand.user.id === loggedInUser.id}
                <div>
                    Welcome. You {@render UserTooltipInfo({
                        user: event.expand.user,
                    })} have successfully joined this fantastic website. We hope
                    you have a fabulous time here.
                </div>
            {:else}
                <div>
                    User {@render UserTooltipInfo({ user: event.expand.user })} has
                    successfully joined this website.
                </div>
            {/if}
        {:else if event.expand.user.id === loggedInUser.id}
            <div>
                Welcome. You {@render UserTooltipInfo({
                    user: event.expand.user,
                })} have successfully joined this fantastic website. We hope you
                have a fabulous time here. User {@render UserTooltipInfo({
                    user: event.expand.inviter,
                })} has invited you.
            </div>
        {:else}
            <div>
                User {@render UserTooltipInfo({ user: event.expand.inviter })} has
                invited
                {@render UserTooltipInfo({ user: event.expand.user })} to this website.
            </div>
        {/if}
    </li>
{/snippet}

{#snippet UserTooltipInfo({
    user,
}: {
    user: UsersResponse & {
        expand: {
            retainedTiers: TiersResponse[]
        }
    }
})}
    <Popover
        positioning={{
            boundary: ref,
            placement: "bottom-start",
        }}
    >
        {#snippet TriggerSnippet(props)}
            <button
                {...props}
                class={["rounded-full bg-gray-700 px-1.5 py-px", props]}
            >
                {user.username}
            </button>
        {/snippet}

        {#snippet ContentSnippet()}
            <ul class="list-inside list-disc space-y-1">
                <li>Invites: {user.invitedUsers.length}</li>
                <li>
                    Tiers:
                    {#each user.expand.retainedTiers as tier, i}
                        <a class="link" href="/tiers/{tier.id}">
                            {tier.name}
                        </a>
                        {user.expand.retainedTiers.length - 1 !== i ? " " : ""}
                    {/each}
                </li>
            </ul>
        {/snippet}
    </Popover>
{/snippet}

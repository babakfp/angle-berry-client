<script lang="ts">
    import PopSide from "$components/PopSide.svelte"
    import { events, unseenEventsLength } from "$stores/events"
    import type { UsersResponse } from "$utilities/pb-typegen"
    import Event from "./Event.svelte"
    import type {
        ListResult,
        RealtimeEventsResponse,
    } from "$utilities/pb-types"

    export let pbEvents: ListResult<RealtimeEventsResponse>

    events.set(pbEvents)

    export let user: UsersResponse
    export let isOpen = false
    export let toggleButton: HTMLButtonElement

    $: if (isOpen && $unseenEventsLength) unseenEventsLength.set(0)
</script>

<PopSide id="EventsMenu" bind:isOpen {toggleButton}>
    {#if $events.items.length > 0}
        <ol class="overflow-y-auto overscroll-y-contain sm:text-sm">
            {#each $events.items as event (event.id)}
                <Event {user} {event} />
            {/each}
            <p class="p-4 text-center text-xs text-gray-500">
                No more events found!
            </p>
        </ol>
    {:else}
        <p class="p-4">No events have been found here.</p>
    {/if}
</PopSide>

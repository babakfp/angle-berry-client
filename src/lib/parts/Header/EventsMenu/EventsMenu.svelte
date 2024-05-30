<script lang="ts">
    import PopSide from "$lib/components/PopSide.svelte"
    import { events, unseenEventsLength } from "$lib/stores/events"
    import type {
        ListResult,
        RealtimeEventsResponse,
        UsersResponse,
    } from "$lib/utilities/pb/types"
    import Event from "./Event.svelte"

    export let pbEvents: ListResult<RealtimeEventsResponse>

    events.set(pbEvents)

    export let loggedInUser: UsersResponse
    export let isOpen = false
    export let toggleButton: HTMLButtonElement

    $: if (isOpen && $unseenEventsLength) unseenEventsLength.set(0)
</script>

<PopSide id="EventsMenu" bind:isOpen {toggleButton}>
    {#if $events.items.length > 0}
        <ol class="overflow-y-auto overscroll-y-contain sm:text-sm">
            {#each $events.items as event (event.id)}
                <Event {loggedInUser} {event} />
            {/each}
            <p class="p-4 text-center text-xs text-gray-500">
                No more events found!
            </p>
        </ol>
    {:else}
        <p class="px-4 py-6 text-center">No events found!</p>
    {/if}
</PopSide>

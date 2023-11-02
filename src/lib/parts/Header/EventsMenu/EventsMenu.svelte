<script lang="ts">
    import { page } from "$app/stores"
    import PopSide from "$components/PopSide.svelte"
    import { events, unseenEventsLength } from "$stores/events"
    import Event from "./Event.svelte"

    events.set($page.data.events || [])

    export let isOpen
    export let toggleButton

    $: if (isOpen && $unseenEventsLength) unseenEventsLength.set(0)
</script>

<PopSide id="EventsMenu" bind:isOpen {toggleButton}>
    {#if $events.length > 0}
        <ol class="overflow-y-auto overscroll-y-contain sm:text-sm">
            {#each $events as event (event.id)}
                <Event {event} />
            {/each}
            <p class="p-4 text-center text-xs text-gray-500">
                No more events found!
            </p>
        </ol>
    {:else}
        <p class="p-4">No events have been found here.</p>
    {/if}
</PopSide>

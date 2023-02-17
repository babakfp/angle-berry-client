<script>
	import PopSide from "$lib/PopSide.svelte"
	import { events } from "$lib/events.js"
	import Event from "./Event.svelte"

	export let data
	events.set(data.events || [])

	export let isOpen
	export let toggleButton
</script>

<PopSide id="EventsMenu" bind:isOpen {toggleButton}>
	{#if $events.length > 0}
		<ol class="overflow-y-auto sm:text-sm">
			{#each $events as event (event.id)}
				<Event user={data.user} {event} />
			{/each}
			<p class="p-4 text-center text-xs text-gray-500">
				No more events found!
			</p>
		</ol>
	{:else}
		<p class="p-4">No events have been found here.</p>
	{/if}
</PopSide>

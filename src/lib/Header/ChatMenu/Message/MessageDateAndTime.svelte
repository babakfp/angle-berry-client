<script>
	import { dateToAMPM } from "./dateToAMPM.js"

	export let created
	export let updated
	export let isCurrentUser

	const date = new Date(updated)
	const isToday = isDateToday(date)
	const isYesterday = isDateYesterday(date)

	function isDateToday(someDate) {
		const today = new Date()
		return (
			someDate.getDate() === today.getDate() &&
			someDate.getMonth() === today.getMonth() &&
			someDate.getFullYear() === today.getFullYear()
		)
	}

	function isDateYesterday(someDate) {
		const today = new Date()
		return (
			someDate.getDate() === today.getDate() - 1 &&
			someDate.getMonth() === today.getMonth() &&
			someDate.getFullYear() === today.getFullYear()
		)
	}
</script>

<div class="mt-1.5 text-2xs text-gray-500 {isCurrentUser && 'text-right'}">
	{#if isToday || isYesterday}
		{isToday ? "Today" : "Yesterday"} at {dateToAMPM(date)}
	{:else}
		{date.toLocaleDateString()} {dateToAMPM(date)}
	{/if}
	{#if created !== updated}
		- Edited
	{/if}
</div>

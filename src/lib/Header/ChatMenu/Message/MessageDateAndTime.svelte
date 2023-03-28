<script>
	import { dateToAMPM } from "./dateToAMPM.js"

	export let messageCreatedAt
	export let isCurrentUser

	const date = new Date(messageCreatedAt)
	const isToday = checkIsToday(date)
	const isYesterday = checkIsYesterday(date)

	function checkIsToday(someDate) {
		const today = new Date()
		return (
			someDate.getDate() === today.getDate() &&
			someDate.getMonth() === today.getMonth() &&
			someDate.getFullYear() === today.getFullYear()
		)
	}

	function checkIsYesterday(someDate) {
		const today = new Date()
		return (
			someDate.getDate() === today.getDate() - 1 &&
			someDate.getMonth() === today.getMonth() &&
			someDate.getFullYear() === today.getFullYear()
		)
	}
</script>

<div class="mt-1.5 text-2xs text-gray-500 {isCurrentUser && 'text-right'}">
	<span>
		{#if isToday || isYesterday}
			{isToday ? "Today" : "Yesterday"} at {dateToAMPM(date)}
		{:else}
			{date.toLocaleDateString()} {dateToAMPM(date)}
		{/if}
	</span>
</div>

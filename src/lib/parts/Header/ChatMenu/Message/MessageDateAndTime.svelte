<script lang="ts">
    import { dateToAMPM } from "$utilities/dateToAMPM.js"

    export let created
    export let updated
    export let isCurrentUser

    $: date = new Date(updated)
    $: isToday = isDateToday(date)
    $: isYesterday = isDateYesterday(date)

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

<div class="mt-1 text-2xs text-gray-500 {isCurrentUser && 'text-right'}">
    {#if isToday || isYesterday}
        {isToday ? "Today" : "Yesterday"} {dateToAMPM(date)}
    {:else}
        {date.toLocaleDateString()} {dateToAMPM(date)}
    {/if}

    {#if created !== updated}
        - Edited
    {/if}
</div>

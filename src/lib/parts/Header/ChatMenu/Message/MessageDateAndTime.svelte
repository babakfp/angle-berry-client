<script lang="ts">
    import { dateToAMPM } from "@/lib/utilities/dateToAMPM"

    export let created: string
    export let updated: string
    export let isCurrentUser: boolean

    $: date = new Date(updated)
    $: isToday = isDateToday(date)
    $: isYesterday = isDateYesterday(date)

    const isDateToday = (someDate: Date) => {
        const today = new Date()
        return (
            someDate.getDate() === today.getDate() &&
            someDate.getMonth() === today.getMonth() &&
            someDate.getFullYear() === today.getFullYear()
        )
    }

    const isDateYesterday = (someDate: Date) => {
        const today = new Date()
        return (
            someDate.getDate() === today.getDate() - 1 &&
            someDate.getMonth() === today.getMonth() &&
            someDate.getFullYear() === today.getFullYear()
        )
    }
</script>

<div class="text-2xs text-gray-500 {isCurrentUser && 'text-right'}">
    {#if isToday || isYesterday}
        {isToday ? "Today" : "Yesterday"} {dateToAMPM(date)}
    {:else}
        {date.toLocaleDateString()} {dateToAMPM(date)}
    {/if}

    {#if created !== updated}
        - Edited
    {/if}
</div>

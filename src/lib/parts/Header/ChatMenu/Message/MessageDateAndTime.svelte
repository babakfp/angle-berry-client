<script lang="ts">
    import { dateToAMPM } from "$lib/utilities/dateToAMPM"

    let {
        created,
        updated,
        isCurrentUser,
    }: {
        created: string
        updated: string
        isCurrentUser: boolean
    } = $props()

    const isDateToday = (someDate: Date) => {
        const today = new Date()
        return (
            someDate.getDate() === today.getDate()
            && someDate.getMonth() === today.getMonth()
            && someDate.getFullYear() === today.getFullYear()
        )
    }

    const isDateYesterday = (someDate: Date) => {
        const today = new Date()
        return (
            someDate.getDate() === today.getDate() - 1
            && someDate.getMonth() === today.getMonth()
            && someDate.getFullYear() === today.getFullYear()
        )
    }
    let date = $derived(new Date(updated))
    let isToday = $derived(isDateToday(date))
    let isYesterday = $derived(isDateYesterday(date))
</script>

<div class={["text-2xs text-gray-500", { "text-right": isCurrentUser }]}>
    {#if isToday || isYesterday}
        {isToday ? "Today" : "Yesterday"} {dateToAMPM(date)}
    {:else}
        {date.toLocaleDateString()} {dateToAMPM(date)}
    {/if}

    {#if created !== updated}
        - Edited
    {/if}
</div>

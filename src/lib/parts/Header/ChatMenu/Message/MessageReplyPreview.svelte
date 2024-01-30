<script lang="ts">
    import { goToMessage } from "../goToMessage"

    export let id: string
    export let username: string
    export let content: string

    let interval: number | undefined

    const handleGoToMessage = () => {
        interval = goToMessage(id, interval)
    }
</script>

<button
    type="button"
    class="flex w-full gap-1 pb-2 pl-3 pr-4 pt-2.5 text-2xs text-white/50 duration-150 hover:bg-white/5 hover:text-white"
    on:click={handleGoToMessage}
>
    <span class="font-semibold">
        {username}
    </span>
    <span class="line-clamp-1">
        {content}
    </span>
</button>

<hr class="border-white/5" />

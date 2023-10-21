<script>
    import { goToMessage } from "../goToMessage.js"

    export let id
    export let username
    export let content

    /** @type {number | undefined} */
    let interval

    function handleGoToMessage() {
        interval = goToMessage(id, interval)
    }
</script>

<button
    class="block w-full pb-2 pl-3 pr-4 pt-2.5 text-xs text-white/50 duration-150 hover:bg-white/5 hover:text-white"
    on:click={handleGoToMessage}
>
    <div class="flex gap-1">
        <span class="font-semibold">
            {username}
        </span>
        <div class="line-clamp-1">
            {@html content}
        </div>
    </div>
</button>

<hr class="border-white/5" />

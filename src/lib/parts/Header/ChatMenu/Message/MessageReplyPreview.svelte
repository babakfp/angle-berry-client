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
    class="-ml-3 mb-2 block border-l-2 pl-2 text-left text-xs text-white/80 hover:text-white/100"
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

<script lang="ts">
    import { goToMessage } from "../goToMessage"

    let {
        id,
        username,
        content,
    }: {
        id: string
        username: string
        content: string
    } = $props()

    let interval: number | undefined

    const handleGoToMessage = () => {
        interval = goToMessage(id, interval)
    }
</script>

<button
    type="button"
    class="flex w-full gap-1 pb-2 pl-3 pr-4 pt-2.5 text-2xs text-gray-50/50 duration-150 hover:bg-gray-50/5 hover:text-gray-50"
    onclick={handleGoToMessage}
>
    <span class="font-semibold">
        {username}
    </span>
    <span class="line-clamp-1">
        {content}
    </span>
</button>

<hr class="border-gray-50/5" />

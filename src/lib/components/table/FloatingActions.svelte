<script lang="ts">
    let {
        itemsLength,
        onClear,
    }: {
        itemsLength: number
        onClear: () => void
    } = $props()
</script>

<div
    class={[
        "fixed inset-x-0 bottom-4 z-50 px-4 duration-150 sm:bottom-8 sm:mx-auto sm:max-w-xl",
        { "hide translate-y-4 sm:translate-y-8": !itemsLength },
    ]}
>
    <div
        class="group grid gap-2 rounded bg-gray-700 p-4 sm:flex sm:items-center sm:justify-between"
    >
        <span class="text-center sm:order-2">
            Selected <b>{itemsLength}</b>
            {itemsLength > 1 ? "items" : "item"}
        </span>

        <hr class="my-2 border-gray-600 sm:hidden" />

        <button type="button" class="btn btn-gray" onclick={onClear}>
            Clear selection
        </button>

        <!-- TODO: we can remove this wrapper mayne (mobile/desktop check first)? -->
        <div class="sm:order-3">
            <button type="submit" class="btn btn-danger w-full">
                Delete selected
            </button>
        </div>
    </div>
</div>

<div class="h-24"></div>

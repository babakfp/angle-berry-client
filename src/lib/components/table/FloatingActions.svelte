<script lang="ts">
    export let selectedItemIds: string[]
    export let deleteActionAttribute: `?/${string}` | undefined
    export let deleteInputNameAttribute: string
</script>

<div
    class="fixed inset-x-4 bottom-4 z-50 duration-200 sm:bottom-8
    {!selectedItemIds.length && 'translate-y-full hide'}"
>
    <div
        class="grid gap-2 rounded bg-gray-700 p-4 sm:mx-auto sm:flex sm:max-w-xl sm:items-center sm:justify-between"
    >
        <span class="text-center sm:order-2">
            Selected <b>{selectedItemIds.length}</b>
            {selectedItemIds.length > 1 ? "items" : "item"}
        </span>

        <hr class="my-2 border-t-gray-600 sm:hidden" />

        <button
            type="button"
            class="btn btn-gray"
            on:click={() => (selectedItemIds = [])}
        >
            Clear selection
        </button>

        <form class="sm:order-3" method="post" action={deleteActionAttribute}>
            <button type="submit" class="btn btn-danger w-full">
                Delete selected
            </button>

            {#each selectedItemIds as id}
                <input
                    class="hidden"
                    type="checkbox"
                    name={deleteInputNameAttribute}
                    value={id}
                    checked
                />
            {/each}
        </form>
    </div>
</div>

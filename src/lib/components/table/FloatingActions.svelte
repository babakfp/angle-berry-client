<script lang="ts">
    import IconArrowDownRegular from "phosphor-icons-svelte/IconArrowDownRegular.svelte"
    import IconArrowUpRegular from "phosphor-icons-svelte/IconArrowUpRegular.svelte"
    import toast from "svelte-french-toast"
    import FormBase from "@/lib/components/form/FormBase.svelte"

    export let selectedItemIds: string[]
    export let deleteActionAttribute: `?/${string}` | undefined
    export let deleteInputNameAttribute: string

    let isPartlyVisible = false

    $: if (!selectedItemIds.length) {
        isPartlyVisible = false
    }
</script>

<div
    class="fixed inset-x-0 bottom-4 z-50 px-4 duration-200 sm:bottom-8 sm:mx-auto sm:max-w-xl
    {!selectedItemIds.length && 'translate-y-full hide'}
    {isPartlyVisible && 'translate-y-full sm:translate-y-[calc(100%+1rem)]'}"
>
    <div
        class="group grid gap-2 rounded bg-gray-700 p-4 sm:flex sm:items-center sm:justify-between"
    >
        <button
            class="btn btn-gray absolute bottom-full right-4 h-8 w-8 -translate-y-2 p-0 duration-200 supports-hover:hide supports-hover:group-hover:show"
            on:click={() => (isPartlyVisible = !isPartlyVisible)}
        >
            {#if isPartlyVisible}
                <IconArrowUpRegular />
            {:else}
                <IconArrowDownRegular />
            {/if}
        </button>

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

        <FormBase
            class="sm:order-3"
            action={deleteActionAttribute}
            on:success={() => {
                selectedItemIds = []
                toast.success("Deleted successfully!", {
                    position: "bottom-right",
                })
            }}
        >
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
        </FormBase>
    </div>
</div>

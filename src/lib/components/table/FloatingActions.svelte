<script lang="ts">
    import toast from "svelte-hot-french-toast"
    import FormBase from "$lib/components/form/FormBase.svelte"

    let {
        selectedItemIds = $bindable(),
        deleteActionAttribute,
        deleteInputNameAttribute,
    }: {
        selectedItemIds: string[]
        deleteActionAttribute: `?/${string}`
        deleteInputNameAttribute: string
    } = $props()
</script>

<div
    class={[
        "fixed inset-x-0 bottom-4 z-50 px-4 duration-150 sm:bottom-8 sm:mx-auto sm:max-w-xl",
        { "hide translate-y-4 sm:translate-y-8": !selectedItemIds.length },
    ]}
>
    <div
        class="group grid gap-2 rounded bg-gray-700 p-4 sm:flex sm:items-center sm:justify-between"
    >
        <span class="text-center sm:order-2">
            Selected <b>{selectedItemIds.length}</b>
            {selectedItemIds.length > 1 ? "items" : "item"}
        </span>

        <hr class="my-2 border-gray-600 sm:hidden" />

        <button
            type="button"
            class="btn btn-gray"
            onclick={() => (selectedItemIds = [])}
        >
            Clear selection
        </button>

        <FormBase
            class="sm:order-3"
            action={deleteActionAttribute}
            onSuccess={() => {
                selectedItemIds = []
                toast.success("Deleted successfully!")
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

<div class="h-24"></div>

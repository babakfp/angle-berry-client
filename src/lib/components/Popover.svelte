<script lang="ts">
    import { Popover } from "@ark-ui/svelte/popover"
    import type { Snippet } from "svelte"

    let {
        positioning,
        TriggerSnippet,
        ContentSnippet,
    }: {
        positioning?: Popover.RootProps["positioning"]
        TriggerSnippet?: Snippet
        ContentSnippet?: Snippet
    } = $props()
</script>

<Popover.Root {positioning}>
    <Popover.Trigger>
        {@render TriggerSnippet?.()}
    </Popover.Trigger>
    <Popover.Positioner>
        <Popover.Content
            class="hide data-[state=open]:show rounded bg-gray-700 px-4 py-3 text-xs whitespace-nowrap drop-shadow duration-150"
            hidden={false}
        >
            {@render ContentSnippet?.()}
        </Popover.Content>
    </Popover.Positioner>
</Popover.Root>

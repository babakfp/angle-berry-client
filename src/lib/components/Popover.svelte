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
            class={[
                "rounded bg-gray-700 px-4 py-3 text-xs whitespace-nowrap drop-shadow",
                "data-[state=open]:animate-in data-[state=open]:fade-in",
                "data-[state=closed]:animate-out data-[state=closed]:fade-out",
            ]}
        >
            {@render ContentSnippet?.()}
        </Popover.Content>
    </Popover.Positioner>
</Popover.Root>

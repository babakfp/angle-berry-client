<script lang="ts">
    import { Collapsible } from "@ark-ui/svelte/collapsible"
    import IconCaretDownBold from "phosphor-icons-svelte/IconCaretDownBold.svelte"
</script>

<Collapsible.Root>
    <Collapsible.Trigger
        class="btn btn-gray-light cursor-pointer list-none gap-2 text-xs"
    >
        Login Without Registering
        <Collapsible.Indicator class="group">
            <IconCaretDownBold
                class="group-data-[state=open]:flip-y transition-all"
            />
        </Collapsible.Indicator>
    </Collapsible.Trigger>
    <Collapsible.Content
        class={[
            "overflow-hidden",
            "data-[state=open]:animate-collapsible-down",
            "data-[state=closed]:animate-collapsible-up",
        ]}
        style="--radix-collapsible-content-height: var(--height)"
    >
        <ul
            class="mt-2 list-inside list-disc space-y-1 rounded bg-gray-700 p-4 text-xs"
        >
            <li class="space-y-1">
                <b>Admin</b>
                <ul class="list-inside list-disc space-y-1 pl-4">
                    <li>
                        Username: <span class="select-text">admin</span>
                    </li>
                    <li>
                        Password: <span class="select-text">adminadmin</span>
                    </li>
                </ul>
            </li>
            <li class="space-y-1">
                <b>User</b>
                <ul class="list-inside list-disc space-y-1 pl-4">
                    <li>
                        Username: <span class="select-text">user</span>
                    </li>
                    <li>
                        Password: <span class="select-text">useruser</span>
                    </li>
                </ul>
            </li>
        </ul>
    </Collapsible.Content>
</Collapsible.Root>

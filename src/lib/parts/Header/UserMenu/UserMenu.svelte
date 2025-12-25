<script lang="ts">
    import { Popover } from "@ark-ui/svelte/popover"
    import { Portal } from "@ark-ui/svelte/portal"
    import IconCrownSimpleRegular from "phosphor-icons-svelte/IconCrownSimpleRegular.svelte"
    import IconGaugeRegular from "phosphor-icons-svelte/IconGaugeRegular.svelte"
    import IconUserRegular from "phosphor-icons-svelte/IconUserRegular.svelte"
    import { copy } from "svelte-copy"
    import toast from "svelte-hot-french-toast"
    import { beforeNavigate } from "$app/navigation"
    import { page } from "$app/state"
    import type { TiersResponse, UsersResponse } from "$lib/utilities/pb"
    import Tier from "./Tier.svelte"

    let {
        loggedInUser,
        tiers,
    }: {
        loggedInUser: UsersResponse
        tiers: TiersResponse[]
    } = $props()

    let isUserMenuOpen = $state(false)

    beforeNavigate(() => (isUserMenuOpen = false))
</script>

<svelte:document onmouseleave={() => (isUserMenuOpen = false)} />
<svelte:window onscroll={() => (isUserMenuOpen = false)} />

<Popover.Root
    bind:open={isUserMenuOpen}
    positioning={{
        placement: "bottom-end",
        gutter: 0,
    }}
    portalled
>
    <Popover.Trigger
        class="outline-inset flex items-center pr-4 pl-2 text-2xl duration-150 hover:text-gray-50"
        title="User menu"
    >
        {#if loggedInUser.isAdmin}
            <IconCrownSimpleRegular />
        {:else}
            <IconUserRegular />
        {/if}
    </Popover.Trigger>

    <Portal>
        <Popover.Positioner class="-left-2!">
            <Popover.Content
                class={[
                    "bg-background relative z-10 w-64 overflow-hidden rounded text-sm shadow-[0_4px_16px_0_rgb(0_0_0/0.4)]",
                    "data-[state=open]:animate-in data-[state=open]:fade-in data-[state=open]:slide-in-from-right-4",
                    "data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=closed]:slide-out-to-right-4",
                ]}
            >
                {@render ScrollShadow({ position: "top" })}

                <div
                    class="relative z-1 max-h-[calc(var(--dvh-minus-header)-(--spacing(4)))] overflow-y-auto overscroll-y-contain"
                >
                    <div class="flex justify-between p-4">
                        <span>Signed in as</span>
                        <span>{loggedInUser.username}</span>
                    </div>

                    {#if loggedInUser.isAdmin}
                        <a
                            class="outline-inset flex justify-between border-t border-gray-50/5 p-4 underline duration-150 hover:text-gray-50"
                            href="/admin"
                        >
                            <span>Admin Dashboard</span>
                            <IconGaugeRegular class="text-2xl" />
                        </a>
                    {/if}

                    <a
                        class="outline-inset flex justify-between border-t border-gray-50/5 p-4 duration-150 hover:text-gray-50"
                        href="/how-to-invite"
                    >
                        <span>
                            Invites: {loggedInUser.invitedUsers.length}
                        </span>
                        <span class="underline">Start inviting</span>
                    </a>

                    <button
                        type="button"
                        class="group outline-inset border-y border-gray-50/5 p-4"
                        onclick={() =>
                            toast.success(
                                "Your invite link is copied to Clipboard.",
                            )}
                        use:copy={`${page.url.origin}/register?id=${loggedInUser.id}`}
                    >
                        <span class="group-hover:text-gray-50">
                            Click to copy your invite link:
                        </span>
                        <p class="mt-1 text-xs text-gray-500 select-text">
                            {page.url.origin}/register?id={loggedInUser.id}
                        </p>
                    </button>

                    {#if tiers.length}
                        <ol>
                            {#each tiers as tier}
                                <Tier {loggedInUser} {tier} />
                            {/each}
                        </ol>
                    {/if}

                    <form action="/login-as" method="post">
                        <button
                            type="submit"
                            class="outline-inset flex w-full items-center justify-between border-t border-gray-50/5 p-4 text-left duration-150 hover:text-gray-50"
                        >
                            <span>
                                Login as {loggedInUser.isAdmin ? "a User" : (
                                    "an Admin"
                                )}
                            </span>
                            {#if loggedInUser.isAdmin}
                                <IconUserRegular class="text-2xl" />
                            {:else}
                                <IconCrownSimpleRegular class="text-2xl" />
                            {/if}
                        </button>
                    </form>

                    <form action="/logout" method="post">
                        <button
                            type="submit"
                            class="outline-inset w-full rounded-b border-t border-gray-50/5 p-4 text-left duration-150 hover:text-gray-50"
                        >
                            Logout
                        </button>
                    </form>
                </div>

                {@render ScrollShadow({ position: "bottom" })}
            </Popover.Content>
        </Popover.Positioner>
    </Portal>
</Popover.Root>

{#snippet ScrollShadow({ position }: { position: "top" | "bottom" })}
    <div
        class={[
            "from-background pointer-events-none absolute inset-x-0  h-4 bg-linear-to-b to-transparent",
            {
                "top-0 bg-linear-to-b": position === "top",
                "bottom-0 bg-linear-to-t": position === "bottom",
            },
        ]}
    ></div>
{/snippet}

<script lang="ts">
    import { Popover } from "@ark-ui/svelte/popover"
    import IconCrownSimpleRegular from "phosphor-icons-svelte/IconCrownSimpleRegular.svelte"
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
>
    <Popover.Trigger>
        <div
            class="outline-inset flex items-center pr-4 pl-2 text-2xl duration-200 hover:text-gray-50"
            title="User menu"
        >
            {#if loggedInUser.isAdmin}
                <IconCrownSimpleRegular />
            {:else}
                <IconUserRegular />
            {/if}
        </div>
    </Popover.Trigger>
    <Popover.Positioner>
        <Popover.Content
            class="bg-background hide data-[state=open]:show max-h-[calc(var(--screen-minus-header)-(--spacing(8)))] w-64 translate-x-6 overflow-y-auto overscroll-y-contain rounded text-sm shadow-[0_4px_16px_0_rgb(0_0_0/0.4)] duration-200 data-[state=open]:-translate-x-2"
            hidden={false}
        >
            <div class="flex justify-between p-4">
                <span>Signed in as</span>
                <span>{loggedInUser.username}</span>
            </div>

            {#if loggedInUser.isAdmin}
                <a
                    class="outline-inset flex justify-between border-t border-gray-50/5 p-4 underline duration-200 hover:text-gray-50"
                    href="/admin"
                >
                    Admin Dashboard
                </a>
            {/if}

            <a
                class="outline-inset flex justify-between border-t border-gray-50/5 p-4 duration-200 hover:text-gray-50"
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
                    toast.success("Your invite link is copied to Clipboard.", {
                        position: "bottom-end",
                    })}
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
                    class="outline-inset flex w-full items-center justify-between border-t border-gray-50/5 p-4 text-left duration-200 hover:text-gray-50"
                >
                    <span>
                        Login as {loggedInUser.isAdmin ? "a User" : "an Admin"}
                    </span>
                    {#if loggedInUser.isAdmin}
                        <IconUserRegular class="text-xl" />
                    {:else}
                        <IconCrownSimpleRegular class="text-xl" />
                    {/if}
                </button>
            </form>

            <form action="/logout" method="post">
                <button
                    type="submit"
                    class="outline-inset w-full rounded-b border-t border-gray-50/5 p-4 text-left duration-200 hover:text-gray-50"
                >
                    Logout
                </button>
            </form>
        </Popover.Content>
    </Popover.Positioner>
</Popover.Root>

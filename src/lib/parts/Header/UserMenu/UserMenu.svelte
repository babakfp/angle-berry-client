<script lang="ts">
    import IconCrownSimpleRegular from "phosphor-icons-svelte/IconCrownSimpleRegular.svelte"
    import IconUserRegular from "phosphor-icons-svelte/IconUserRegular.svelte"
    import { onMount } from "svelte"
    import { copy } from "svelte-copy"
    import toast from "svelte-hot-french-toast"
    import { OutClick } from "svelte-outclick"
    import { beforeNavigate } from "$app/navigation"
    import { page } from "$app/state"
    import type { TiersResponse, UsersResponse } from "$lib/utilities/pb"
    import Tier from "./Tier.svelte"

    let {
        loggedInUser,
        tiers,
        userMenuToggle,
        isUserMenuOpen = $bindable(false),
    }: {
        loggedInUser: UsersResponse
        tiers: TiersResponse[]
        userMenuToggle: HTMLButtonElement
        isUserMenuOpen?: boolean
    } = $props()

    beforeNavigate(() => (isUserMenuOpen = false))
    onMount(() =>
        document.addEventListener("mouseleave", () => (isUserMenuOpen = false)),
    )
</script>

<svelte:window onscroll={() => (isUserMenuOpen = false)} />

<OutClick
    onOutClick={() => (isUserMenuOpen = false)}
    excludeElements={userMenuToggle}
    tag="nav"
>
    <ul
        id="UserMenu"
        class={[
            "bg-background hide absolute top-full right-0 max-h-[calc(var(--screen-minus-header)-(--spacing(8)))] w-60 translate-x-8 overflow-y-auto overscroll-y-contain rounded text-sm shadow-[0_4px_16px_0_rgb(0_0_0/0.4)] duration-200",
            { "show! -translate-x-4!": isUserMenuOpen },
        ]}
    >
        <li class="flex justify-between p-4">
            <span>Signed in as</span>
            <span>{loggedInUser.username}</span>
        </li>

        {#if loggedInUser.isAdmin}
            <a
                class="outline-inset flex justify-between border-t border-gray-50/5 p-4 underline duration-200 hover:text-gray-50"
                href="/admin"
            >
                Admin Dashboard
            </a>
        {/if}

        <li>
            <a
                class="outline-inset flex justify-between border-t border-gray-50/5 p-4 duration-200 hover:text-gray-50"
                href="/how-to-invite"
            >
                <span>
                    Invites: {loggedInUser.invitedUsers.length}
                </span>
                <span class="underline">Start inviting</span>
            </a>
        </li>

        <li use:copy={`${page.url.origin}/register?id=${loggedInUser.id}`}>
            <button
                type="button"
                class="group outline-inset border-y border-gray-50/5 p-4"
                onclick={() =>
                    toast.success("Your invite link is copied to Clipboard.", {
                        position: "bottom-end",
                    })}
            >
                <span class="group-hover:text-gray-50">
                    Click to copy your invite link:
                </span>
                <p class="mt-1 text-xs text-gray-500 select-text">
                    {page.url.origin}/register?id={loggedInUser.id}
                </p>
            </button>
        </li>

        {#if tiers.length}
            <ol>
                {#each tiers as tier}
                    <Tier {loggedInUser} {tier} />
                {/each}
            </ol>
        {/if}

        <li>
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
        </li>

        <li>
            <form action="/logout" method="post">
                <button
                    type="submit"
                    class="outline-inset w-full rounded-b border-t border-gray-50/5 p-4 text-left duration-200 hover:text-gray-50"
                >
                    Logout
                </button>
            </form>
        </li>
    </ul>
</OutClick>

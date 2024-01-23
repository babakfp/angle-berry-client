<script lang="ts">
    import OutClick from "svelte-outclick"
    import { copy } from "svelte-copy"
    import toast from "svelte-french-toast"
    import { onMount } from "svelte"
    import { page } from "$app/stores"
    import { beforeNavigate } from "$app/navigation"
    import Tier from "./Tier.svelte"
    import IconUserRegular from "phosphor-icons-svelte/IconUserRegular.svelte"
    import IconCrownSimpleRegular from "phosphor-icons-svelte/IconCrownSimpleRegular.svelte"

    export let userMenuToggle: HTMLButtonElement
    export let isUserMenuOpen = false

    beforeNavigate(() => (isUserMenuOpen = false))
    onMount(() =>
        document.addEventListener("mouseleave", () => (isUserMenuOpen = false)),
    )
</script>

<svelte:window on:scroll={() => (isUserMenuOpen = false)} />

<OutClick
    on:outclick={() => (isUserMenuOpen = false)}
    excludeElements={userMenuToggle}
    tag="nav"
>
    <ul
        id="UserMenu"
        class="absolute right-0 top-full max-h-[calc(var(--screen-minus-header)-theme(spacing.8))] w-60 translate-x-full overflow-y-auto overscroll-y-contain rounded bg-body-bg text-sm shadow-[0_4px_16px_0_rgb(0_0_0/0.4)] duration-200 hide
		{isUserMenuOpen && '!-translate-x-4 !show'}"
    >
        <li class="flex justify-between p-4">
            <span>Signed in as</span>
            <span>{$page.data.user.username}</span>
        </li>

        <li>
            <a
                class="flex justify-between border-t border-white/5 p-4 duration-200 outline-inset hover:text-white"
                href="/how-to-invite"
            >
                <span>
                    Invites: {$page.data.user.invitedUsers.length}
                </span>
                <span class="underline">Start inviting</span>
            </a>
        </li>

        <li use:copy={`${$page.url.origin}/register?id=${$page.data.user.id}`}>
            <button
                class="border-y border-white/5 p-4 outline-inset"
                on:click={() =>
                    toast.success("Your invite link is copied to Clipboard.", {
                        position: "bottom-right",
                    })}
            >
                <span>Click to copy your invite link:</span>
                <p class="mt-1 select-text text-xs text-gray-500">
                    {$page.url.origin}/register?id={$page.data.user.id}
                </p>
            </button>
        </li>

        <ol>
            {#each $page.data.tiers as tier}
                <Tier {tier} />
            {/each}
        </ol>

        <li>
            <a
                class="flex w-full items-center justify-between rounded-b border-t border-white/5 p-4 text-left duration-200 outline-inset hover:text-white"
                href="/login-as"
            >
                <span>
                    Login as {$page.data.user.isAdmin ? "a User" : "an Admin"}
                </span>
                {#if $page.data.user.isAdmin}
                    <IconUserRegular class="text-xl" />
                {:else}
                    <IconCrownSimpleRegular class="text-xl" />
                {/if}
            </a>
        </li>

        <li>
            <a
                class="block w-full rounded-b border-t border-white/5 p-4 text-left duration-200 outline-inset hover:text-white"
                href="/logout"
            >
                Logout
            </a>
        </li>
    </ul>
</OutClick>

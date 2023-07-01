<script>
    import OutClick from "svelte-outclick"
    import { copy } from "svelte-copy"
    import toast, { Toaster } from "svelte-french-toast"
    import { onMount } from "svelte"
    import { page } from "$app/stores"
    import { beforeNavigate } from "$app/navigation"
    import Tier from "./Tier.svelte"

    export let userMenuToggle
    export let isUserMenuOpen = false

    beforeNavigate(() => (isUserMenuOpen = false))
    onMount(() =>
        document.addEventListener("mouseleave", () => (isUserMenuOpen = false))
    )
</script>

<svelte:window on:scroll={() => (isUserMenuOpen = false)} />

<OutClick
    on:outclick={() => (isUserMenuOpen = false)}
    excludeElements={userMenuToggle}
>
    <ul
        id="UserMenu"
        class="absolute right-0 top-full max-h-[calc(var(--tw-screen-h)-var(--header-height)-theme(spacing.8))] w-60 translate-x-full overflow-y-auto overscroll-y-contain rounded bg-gray-800 text-sm shadow-[0_4px_16px_0_rgb(0_0_0/0.4)] duration-200 hide
		{isUserMenuOpen && '!-translate-x-4 !show'}"
    >
        <li>
            <a
                class="flex items-center justify-between rounded-t p-4 duration-200 outline-inset hover:text-white"
                href="/how-to-invite"
                type="button"
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
                <p class="mt-1 select-text text-xs leading-4 text-gray-500">
                    {$page.url.origin}/register?id={$page.data.user.id}
                </p>
            </button>
        </li>

        <nav class="max-h-64 overflow-y-auto">
            <ol>
                {#each $page.data.tiers as tier}
                    <Tier {tier} />
                {/each}
            </ol>
        </nav>

        <li class="border-t border-white/5">
            <form action="/logout" method="POST">
                <button
                    class="w-full rounded-b p-4 text-left duration-200 outline-inset hover:text-white"
                >
                    Logout
                </button>
            </form>
        </li>
    </ul>
</OutClick>

<Toaster />
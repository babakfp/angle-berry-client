<script lang="ts">
    import IconBellSimpleRegular from "phosphor-icons-svelte/IconBellSimpleRegular.svelte"
    import IconChatCenteredRegular from "phosphor-icons-svelte/IconChatCenteredRegular.svelte"
    import IconCrownSimpleRegular from "phosphor-icons-svelte/IconCrownSimpleRegular.svelte"
    import { page } from "$app/state"
    import Avatar from "$lib/components/Avatar.svelte"
    import NotificationBlob from "$lib/components/NotificationBlob.svelte"
    import { unseenEventsLength } from "$lib/stores/events"
    import { unreadMessagesLength } from "$lib/stores/messages.svelte"
    import type {
        ListResult,
        RealtimeEventsResponse,
        RealtimeMessagesResponse,
        TiersResponse,
        UsersResponse,
    } from "$lib/utilities/pb"
    import ChatMenu from "./ChatMenu/ChatMenu.svelte"
    import EventsMenu from "./EventsMenu/EventsMenu.svelte"
    import UserMenu from "./UserMenu/UserMenu.svelte"

    let {
        loggedInUser,
        tiers,
        pbEvents,
        pbMessages,
    }: {
        loggedInUser: UsersResponse
        tiers: TiersResponse[]
        pbEvents: ListResult<RealtimeEventsResponse>
        pbMessages: ListResult<RealtimeMessagesResponse>
    } = $props()

    let isEventsMenuOpen = $state(false)
    let eventsMenuToggle = $state<HTMLButtonElement>()

    let isChatMenuOpen = $state(false)
    let chatMenuToggle = $state<HTMLButtonElement>()

    let isUserMenuOpen = $state(false)
    let userMenuToggle = $state<HTMLButtonElement>()

    const isHome = $derived(page.url.pathname === "/")
</script>

<header class="h-header bg-background sticky top-0 z-50 overflow-x-clip shadow">
    <div class="container flex h-full justify-between px-0">
        <svelte:element
            this={isHome ? "div" : "a"}
            class={[
                "outline-inset flex items-center px-4 text-gray-50",
                isHome ? "" : "underline",
            ]}
            href={isHome ? undefined : "/"}
        >
            Angle Berry
        </svelte:element>

        <div class="flex">
            {#if loggedInUser.isAdmin}
                <a
                    class="group outline-inset relative flex items-center px-2"
                    href="/admin"
                    title="Admin dashboard"
                >
                    <IconCrownSimpleRegular
                        class="text-2xl duration-200 group-hover:text-gray-50"
                    />
                </a>
            {/if}
            <button
                type="button"
                class="group outline-inset relative flex items-center px-2"
                bind:this={eventsMenuToggle}
                onclick={() => (isEventsMenuOpen = !isEventsMenuOpen)}
                title="Notifications"
            >
                <IconBellSimpleRegular
                    class="text-2xl duration-200 group-hover:text-gray-50"
                />
                {#if unseenEventsLength._ > 0}
                    <NotificationBlob>
                        {unseenEventsLength._}
                    </NotificationBlob>
                {/if}
            </button>
            <button
                type="button"
                class="group outline-inset relative flex items-center px-2"
                bind:this={chatMenuToggle}
                onclick={() => (isChatMenuOpen = !isChatMenuOpen)}
                title="Chat"
            >
                <IconChatCenteredRegular
                    class="text-2xl duration-200 group-hover:text-gray-50"
                />
                {#if unreadMessagesLength._ > 0}
                    <NotificationBlob>
                        {unreadMessagesLength._}
                    </NotificationBlob>
                {/if}
            </button>
            <div class="relative flex">
                <button
                    type="button"
                    class="outline-inset flex items-center gap-2 pr-4 pl-2 duration-200 hover:text-gray-50"
                    onclick={() => (isUserMenuOpen = !isUserMenuOpen)}
                    bind:this={userMenuToggle}
                    title="User menu"
                >
                    <Avatar class="w-8 rounded-full" />
                </button>
                <UserMenu
                    {loggedInUser}
                    {tiers}
                    {userMenuToggle}
                    bind:isUserMenuOpen
                />
            </div>
        </div>
    </div>
</header>

<EventsMenu
    {loggedInUser}
    {pbEvents}
    bind:isOpen={isEventsMenuOpen}
    toggleButton={eventsMenuToggle}
/>

<ChatMenu
    {loggedInUser}
    {pbMessages}
    bind:isOpen={isChatMenuOpen}
    toggleButton={chatMenuToggle}
/>

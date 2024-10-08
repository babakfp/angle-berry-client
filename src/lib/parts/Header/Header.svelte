<script lang="ts">
    import IconBellSimpleRegular from "phosphor-icons-svelte/IconBellSimpleRegular.svelte"
    import IconChatCenteredRegular from "phosphor-icons-svelte/IconChatCenteredRegular.svelte"
    import IconCrownSimpleRegular from "phosphor-icons-svelte/IconCrownSimpleRegular.svelte"
    import { page } from "$app/stores"
    import Avatar from "$lib/components/Avatar.svelte"
    import NotificationBlob from "$lib/components/NotificationBlob.svelte"
    import { unseenEventsLength } from "$lib/stores/events"
    import { unreadMessagesLength } from "$lib/stores/messages"
    import type {
        ListResult,
        RealtimeEventsResponse,
        RealtimeMessagesResponse,
        TiersResponse,
        UsersResponse,
    } from "$lib/utilities/pb/types"
    import ChatMenu from "./ChatMenu/ChatMenu.svelte"
    import EventsMenu from "./EventsMenu/EventsMenu.svelte"
    import UserMenu from "./UserMenu/UserMenu.svelte"

    export let loggedInUser: UsersResponse
    export let tiers: TiersResponse[]
    export let pbEvents: ListResult<RealtimeEventsResponse>
    export let pbMessages: ListResult<RealtimeMessagesResponse>

    let isEventsMenuOpen = false
    let eventsMenuToggle: HTMLButtonElement

    let isChatMenuOpen = false
    let chatMenuToggle: HTMLButtonElement

    let isUserMenuOpen = false
    let userMenuToggle: HTMLButtonElement

    $: isHome = $page.url.pathname === "/"
</script>

<header class="sticky top-0 z-50 h-header overflow-x-clip bg-body-bg shadow">
    <div class="container flex h-full justify-between px-0">
        <svelte:element
            this={isHome ? "div" : "a"}
            class="flex items-center px-4 text-gray-50 outline-inset {isHome
                ? ''
                : 'underline'}"
            href={isHome ? undefined : "/"}
        >
            Angle Berry
        </svelte:element>

        <div class="flex">
            {#if loggedInUser.isAdmin}
                <a
                    class="group relative flex items-center px-2 outline-inset"
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
                class="group relative flex items-center px-2 outline-inset"
                bind:this={eventsMenuToggle}
                on:click={() => (isEventsMenuOpen = !isEventsMenuOpen)}
                title="Notifications"
            >
                <IconBellSimpleRegular
                    class="text-2xl duration-200 group-hover:text-gray-50"
                />
                {#if $unseenEventsLength > 0}
                    <NotificationBlob>
                        {$unseenEventsLength}
                    </NotificationBlob>
                {/if}
            </button>
            <button
                type="button"
                class="group relative flex items-center px-2 outline-inset"
                bind:this={chatMenuToggle}
                on:click={() => (isChatMenuOpen = !isChatMenuOpen)}
                title="Chat"
            >
                <IconChatCenteredRegular
                    class="text-2xl duration-200 group-hover:text-gray-50"
                />
                {#if $unreadMessagesLength > 0}
                    <NotificationBlob>
                        {$unreadMessagesLength}
                    </NotificationBlob>
                {/if}
            </button>
            <div class="relative flex">
                <button
                    type="button"
                    class="flex items-center gap-2 pl-2 pr-4 duration-200 outline-inset hover:text-gray-50"
                    on:click={() => (isUserMenuOpen = !isUserMenuOpen)}
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

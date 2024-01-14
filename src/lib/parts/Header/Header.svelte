<script lang="ts">
    import { page } from "$app/stores"
    import { unreadMessagesLength } from "$stores/messages"
    import { unseenEventsLength } from "$stores/events"
    import IconBellSimpleRegular from "phosphor-icons-svelte/IconBellSimpleRegular.svelte"
    import IconCrownSimpleRegular from "phosphor-icons-svelte/IconCrownSimpleRegular.svelte"
    import IconChatCenteredRegular from "phosphor-icons-svelte/IconChatCenteredRegular.svelte"
    import Avatar from "$components/Avatar.svelte"
    import NotificationBlob from "$components/NotificationBlob.svelte"
    import ChatMenu from "./ChatMenu/ChatMenu.svelte"
    import EventsMenu from "./EventsMenu/EventsMenu.svelte"
    import UserMenu from "./UserMenu/UserMenu.svelte"

    let isEventsMenuOpen = false
    let eventsMenuToggle: HTMLButtonElement

    let isChatMenuOpen = false
    let chatMenuToggle: HTMLButtonElement

    let isUserMenuOpen = false
    let userMenuToggle: HTMLButtonElement
</script>

<header class="sticky top-0 z-50 h-header overflow-x-clip bg-body-bg shadow">
    <div class="container flex h-full justify-between px-0">
        <a
            class="flex items-center px-4 text-white outline-inset
				{$page.url.pathname === '/' ? 'pointer-events-none' : 'underline'}
			"
            href="/"
        >
            Angle Berry
        </a>
        <div class="flex">
            {#if $page.data.user.isAdmin}
                <a
                    class="group relative flex items-center px-2 outline-inset"
                    href="/admin"
                >
                    <IconCrownSimpleRegular
                        class="text-2xl duration-200 group-hover:text-white"
                    />
                </a>
            {/if}
            <button
                class="group relative flex items-center px-2 outline-inset"
                bind:this={eventsMenuToggle}
                on:click={() => (isEventsMenuOpen = !isEventsMenuOpen)}
            >
                <IconBellSimpleRegular
                    class="text-2xl duration-200 group-hover:text-white"
                />
                {#if $unseenEventsLength > 0}
                    <NotificationBlob>
                        {$unseenEventsLength}
                    </NotificationBlob>
                {/if}
            </button>
            <button
                class="group relative flex items-center px-2 outline-inset"
                bind:this={chatMenuToggle}
                on:click={() => (isChatMenuOpen = !isChatMenuOpen)}
            >
                <IconChatCenteredRegular
                    class="text-2xl duration-200 group-hover:text-white"
                />
                {#if $unreadMessagesLength > 0}
                    <NotificationBlob>
                        {$unreadMessagesLength}
                    </NotificationBlob>
                {/if}
            </button>
            <div class="relative flex">
                <button
                    class="flex items-center gap-2 pl-2 pr-4 duration-200 outline-inset hover:text-white"
                    on:click={() => (isUserMenuOpen = !isUserMenuOpen)}
                    bind:this={userMenuToggle}
                >
                    <Avatar class="w-8 rounded-full" />
                </button>
                <UserMenu {userMenuToggle} bind:isUserMenuOpen />
            </div>
        </div>
    </div>
</header>

<EventsMenu bind:isOpen={isEventsMenuOpen} toggleButton={eventsMenuToggle} />
<ChatMenu bind:isOpen={isChatMenuOpen} toggleButton={chatMenuToggle} />

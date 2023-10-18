<script>
    import { page } from "$app/stores"
    import { unreadMessagesLength } from "$stores/messages.js"
    import { unseenEventsLength } from "$stores/events.js"
    import IconBell from "$icons/IconBell.svelte"
    import IconMessage from "$icons/IconMessage.svelte"
    import Avatar from "$components/Avatar.svelte"
    import NotificationBlob from "$components/NotificationBlob.svelte"
    import ChatMenu from "./ChatMenu/ChatMenu.svelte"
    import EventsMenu from "./EventsMenu/EventsMenu.svelte"
    import UserMenu from "./UserMenu/UserMenu.svelte"

    let isEventsMenuOpen
    let eventsMenuToggle

    let isChatMenuOpen
    let chatMenuToggle

    let isUserMenuOpen = false
    let userMenuToggle
</script>

<header
    class="sticky top-0 z-50 h-header-height overflow-x-clip bg-gray-800 shadow"
>
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
            <button
                class="group relative flex items-center px-2 outline-inset"
                bind:this={eventsMenuToggle}
                on:click={() => (isEventsMenuOpen = !isEventsMenuOpen)}
            >
                <IconBell
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
                <IconMessage
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

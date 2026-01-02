<script lang="ts">
    import { Dialog } from "@ark-ui/svelte/dialog"
    import IconBellSimpleRegular from "phosphor-icons-svelte/IconBellSimpleRegular.svelte"
    import IconChatCenteredRegular from "phosphor-icons-svelte/IconChatCenteredRegular.svelte"
    import { page } from "$app/state"
    import NotificationBlob from "$lib/components/NotificationBlob.svelte"
    import { unseenEventsLength } from "$lib/stores/events.svelte"
    import { unreadMessagesLength } from "$lib/stores/messages.svelte"
    import type { UsersResponse } from "$lib/utilities/pb"
    import ChatMenu from "./ChatMenu/ChatMenu.svelte"
    import EventsMenu from "./EventsMenu/EventsMenu.svelte"
    import UserMenu from "./UserMenu/UserMenu.svelte"

    let {
        loggedInUser,
    }: {
        loggedInUser: UsersResponse
    } = $props()

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
            <EventsMenu {loggedInUser}>
                {#snippet DialogTrigger()}
                    <Dialog.Trigger
                        class="outline-inset relative flex items-center px-2 text-2xl duration-150 hover:text-gray-50"
                        title="Notifications"
                    >
                        <IconBellSimpleRegular />
                        {#if unseenEventsLength._}
                            <NotificationBlob>
                                {unseenEventsLength._}
                            </NotificationBlob>
                        {/if}
                    </Dialog.Trigger>
                {/snippet}
            </EventsMenu>

            <ChatMenu {loggedInUser}>
                {#snippet DialogTrigger()}
                    <Dialog.Trigger
                        class="outline-inset relative flex items-center px-2 text-2xl duration-150 hover:text-gray-50"
                        title="Chat"
                    >
                        <IconChatCenteredRegular />
                        {#if unreadMessagesLength._}
                            <NotificationBlob>
                                {unreadMessagesLength._}
                            </NotificationBlob>
                        {/if}
                    </Dialog.Trigger>
                {/snippet}
            </ChatMenu>

            <UserMenu {loggedInUser} />
        </div>
    </div>
</header>

<script lang="ts">
    import { onDestroy, onMount } from "svelte"
    import { fly } from "svelte/transition"
    import { page } from "$app/stores"
    import { pageTransitionValues } from "@/lib/utilities/pageTransitionValues"
    import { messages, unreadMessagesLength } from "@/lib/stores/messages"
    import { events, unseenEventsLength } from "@/lib/stores/events"
    import { pbHandleClientResponseError } from "@/lib/utilities/pb/helpers"
    import { pb } from "@/lib/stores/pb"
    import Header from "@/lib/parts/Header/Header.svelte"
    import {
        ClientResponseError,
        type RecordSubscription,
        type RealtimeMessagesResponse,
        type RealtimeEventsResponse,
        type MessagesResponse,
        type EventsResponse,
        type UsersResponse,
        type TiersResponse,
    } from "@/lib/utilities/pb/types"

    export let data

    onMount(async () => {
        try {
            await $pb.collection("messages").subscribe(
                "*",
                async (
                    _data: RecordSubscription<
                        MessagesResponse | RealtimeMessagesResponse
                    >,
                ) => {
                    if (_data.action === "update") {
                        const updatedMessage = _data.record as MessagesResponse
                        messages.update((_messages) => {
                            _messages.items = _messages.items.map((msg) => {
                                if (msg.id === updatedMessage.id) {
                                    msg.content = updatedMessage.content
                                    msg.updated = updatedMessage.updated
                                }
                                if (
                                    msg.expand?.repliedTo?.id ===
                                    updatedMessage.id
                                ) {
                                    msg.expand.repliedTo.content =
                                        updatedMessage.content
                                    msg.expand.repliedTo.updated =
                                        updatedMessage.updated
                                }
                                return msg
                            })
                            return _messages
                        })
                    } else if (_data.action === "create") {
                        const createdMessage =
                            _data.record as RealtimeMessagesResponse
                        const userRecord: UsersResponse = await $pb
                            .collection("users")
                            .getOne(createdMessage.user)
                        let repliedToRecord:
                            | RealtimeMessagesResponse
                            | undefined
                        if (createdMessage.repliedTo) {
                            repliedToRecord = await $pb
                                .collection("messages")
                                .getOne(createdMessage.repliedTo, {
                                    expand: "user",
                                })
                        }

                        messages.update((_messages) => {
                            _messages.items = [
                                {
                                    ...createdMessage,
                                    expand: {
                                        user: userRecord,
                                        repliedTo: repliedToRecord,
                                    },
                                },
                                ..._messages.items,
                            ]
                            return _messages
                        })
                        unreadMessagesLength.update((v) => (v += 1))
                    } else if (_data.action === "delete") {
                        const deletedMessage = _data.record as MessagesResponse
                        messages.update((_messages) => {
                            _messages.items = _messages.items.filter(
                                (m) => m.id !== deletedMessage.id,
                            )
                            return _messages
                        })
                        unreadMessagesLength.update((v) => (v -= 1))
                    }
                },
                { requestKey: "messages-subscribe" },
            )
            await $pb.collection("events").subscribe(
                "*",
                async (_data: RecordSubscription<EventsResponse>) => {
                    if (_data.action === "create") {
                        const createdEvent =
                            _data.record as RealtimeEventsResponse
                        const userRecord: UsersResponse & {
                            expand: { retainedTiers: TiersResponse[] }
                        } = await $pb
                            .collection("users")
                            .getOne(createdEvent.user, {
                                expand: "retainedTiers",
                                $autoCancel: false,
                            })
                        let inviterRecord:
                            | (UsersResponse & {
                                  expand: { retainedTiers: TiersResponse[] }
                              })
                            | undefined
                        if (createdEvent.inviter)
                            inviterRecord = await $pb
                                .collection("users")
                                .getOne(createdEvent.inviter, {
                                    expand: "retainedTiers",
                                    $autoCancel: false,
                                })
                        events.update((_events) => {
                            _events.items = [
                                {
                                    ...createdEvent,
                                    expand: {
                                        user: userRecord,
                                        ...(inviterRecord
                                            ? { inviter: inviterRecord }
                                            : {}),
                                    },
                                },
                                ..._events.items,
                            ]
                            return _events
                        })
                        unseenEventsLength.update((v) => (v += 1))

                        if (createdEvent.expand?.inviter?.id === data.user.id) {
                            data.user.invitedUsers = [
                                ...data.user.invitedUsers,
                                createdEvent.expand.user.id,
                            ]
                        }
                    } else if (_data.action === "delete") {
                        const deletedEvent = _data.record as EventsResponse
                        events.update((_events) => {
                            _events.items = _events.items.filter(
                                (m) => m.id !== deletedEvent.id,
                            )
                            return _events
                        })
                        unseenEventsLength.update((v) => (v -= 1))
                    }
                },
                { requestKey: "events-subscribe" },
            )
        } catch (e) {
            if (e instanceof ClientResponseError) {
                pbHandleClientResponseError(e)
            }
            throw e
        }
    })

    onDestroy(async () => {
        await $pb.collection("messages").unsubscribe()
        await $pb.collection("events").unsubscribe()
    })
</script>

<Header
    user={data.user}
    tiers={data.tiers}
    pbEvents={data.events}
    pbMessages={data.messages}
/>

{#key $page.url.pathname}
    <main
        class="container grid min-h-screen-minus-header content-start items-start py-12"
        in:fly={pageTransitionValues}
    >
        <slot />
    </main>
{/key}

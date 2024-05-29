<script lang="ts">
    import { onDestroy, onMount } from "svelte"
    import AnimatePageNavigation from "@/lib/components/AnimatePageNavigation.svelte"
    import Header from "@/lib/parts/Header/Header.svelte"
    import { events, unseenEventsLength } from "@/lib/stores/events"
    import { messages, unreadMessagesLength } from "@/lib/stores/messages"
    import { pb } from "@/lib/stores/pb"
    import { pbHandleClientResponseError } from "@/lib/utilities/pb/helpers"
    import {
        ClientResponseError,
        type EventsResponse,
        type MessagesResponse,
        type RealtimeEventsResponse,
        type RealtimeMessagesResponse,
        type RecordSubscription,
        type TiersResponse,
        type UsersResponse,
    } from "@/lib/utilities/pb/types"

    export let data

    onMount(async () => {
        try {
            await $pb.collection("messages").subscribe(
                "*",
                async (
                    e: RecordSubscription<
                        MessagesResponse | RealtimeMessagesResponse
                    >,
                ) => {
                    if (e.action === "update") {
                        const updatedMessage = e.record as MessagesResponse
                        messages.update((messages_) => {
                            messages_.items = messages_.items.map((msg) => {
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
                            return messages_
                        })
                    } else if (e.action === "create") {
                        const createdMessage =
                            e.record as RealtimeMessagesResponse
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

                        messages.update((messages_) => {
                            messages_.items = [
                                {
                                    ...createdMessage,
                                    expand: {
                                        user: userRecord,
                                        repliedTo: repliedToRecord,
                                    },
                                },
                                ...messages_.items,
                            ]
                            return messages_
                        })
                        unreadMessagesLength.update((v) => (v += 1))
                    } else if (e.action === "delete") {
                        const deletedMessage = e.record as MessagesResponse
                        messages.update((messages_) => {
                            messages_.items = messages_.items.filter(
                                (m) => m.id !== deletedMessage.id,
                            )
                            return messages_
                        })
                        unreadMessagesLength.update((v) => (v -= 1))
                    }
                },
                { requestKey: "messages-subscribe" },
            )
            await $pb.collection("events").subscribe(
                "*",
                async (e: RecordSubscription<EventsResponse>) => {
                    if (e.action === "create") {
                        const createdEvent = e.record as RealtimeEventsResponse
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
                        events.update((events_) => {
                            events_.items = [
                                {
                                    ...createdEvent,
                                    expand: {
                                        user: userRecord,
                                        ...(inviterRecord
                                            ? { inviter: inviterRecord }
                                            : {}),
                                    },
                                },
                                ...events_.items,
                            ]
                            return events_
                        })
                        unseenEventsLength.update((v) => (v += 1))

                        if (
                            createdEvent.expand?.inviter?.id ===
                            data.loggedInUser.id
                        ) {
                            data.loggedInUser.invitedUsers = [
                                ...data.loggedInUser.invitedUsers,
                                createdEvent.expand.user.id,
                            ]
                        }
                    } else if (e.action === "delete") {
                        const deletedEvent = e.record as EventsResponse
                        events.update((events_) => {
                            events_.items = events_.items.filter(
                                (m) => m.id !== deletedEvent.id,
                            )
                            return events_
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
    loggedInUser={data.loggedInUser}
    tiers={data.tiers}
    pbEvents={data.events}
    pbMessages={data.messages}
/>

<AnimatePageNavigation
    class="container grid min-h-screen-minus-header content-start items-start py-12"
>
    <slot />
</AnimatePageNavigation>

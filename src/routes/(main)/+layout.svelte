<script lang="ts">
    import { onDestroy, onMount, type Snippet } from "svelte"
    import AnimatePageNavigation from "$lib/components/AnimatePageNavigation.svelte"
    import Header from "$lib/parts/Header/Header.svelte"
    import { events, unseenEventsLength } from "$lib/stores/events"
    import { messages, unreadMessagesLength } from "$lib/stores/messages"
    import { pb } from "$lib/stores/pb"
    import {
        ClientResponseError,
        pbHandleClientResponseError,
        type MessagesResponse,
        type TiersResponse,
        type UsersResponse,
    } from "$lib/utilities/pb"

    let {
        data = $bindable(),
        children,
    }: {
        data: any
        children: Snippet
    } = $props()

    onMount(async () => {
        try {
            await Promise.all([
                pb._.collection("messages").subscribe(
                    "*",
                    async (e) => {
                        if (e.action === "update") {
                            messages.update((messages_) => {
                                messages_.items = messages_.items.map((msg) => {
                                    if (msg.id === e.record.id) {
                                        msg.content = e.record.content
                                        msg.updated = e.record.updated
                                    }
                                    if (
                                        msg.expand?.repliedTo?.id
                                        === e.record.id
                                    ) {
                                        msg.expand.repliedTo.content =
                                            e.record.content
                                        msg.expand.repliedTo.updated =
                                            e.record.updated
                                    }
                                    return msg
                                })
                                return messages_
                            })
                        } else if (e.action === "create") {
                            const userRecord = await pb._.collection(
                                "users",
                            ).getOne(e.record.user)
                            let repliedToRecord:
                                | (MessagesResponse & {
                                      expand: { user: UsersResponse }
                                  })
                                | undefined
                            if (e.record.repliedTo) {
                                repliedToRecord = await pb._.collection(
                                    "messages",
                                ).getOne(e.record.repliedTo, {
                                    expand: "user",
                                })
                            }

                            messages.update((messages_) => {
                                messages_.items = [
                                    {
                                        ...e.record,
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
                            messages.update((messages_) => {
                                messages_.items = messages_.items.filter(
                                    (m) => m.id !== e.record.id,
                                )
                                return messages_
                            })
                            unreadMessagesLength.update((v) => (v -= 1))
                        }
                    },
                    { requestKey: "messages-subscribe" },
                ),
                pb._.collection("events").subscribe(
                    "*",
                    async (e) => {
                        if (e.action === "create") {
                            const userRecord: UsersResponse & {
                                expand: { retainedTiers: TiersResponse[] }
                            } = await pb._.collection("users").getOne(
                                e.record.user,
                                {
                                    expand: "retainedTiers",
                                    $autoCancel: false,
                                },
                            )
                            let inviterRecord:
                                | (UsersResponse & {
                                      expand: { retainedTiers: TiersResponse[] }
                                  })
                                | undefined
                            if (e.record.inviter)
                                inviterRecord = await pb._.collection(
                                    "users",
                                ).getOne(e.record.inviter, {
                                    expand: "retainedTiers",
                                    $autoCancel: false,
                                })
                            const newEvent = {
                                ...e.record,
                                expand: {
                                    user: userRecord,
                                    inviter: inviterRecord,
                                },
                            }
                            events.update((events_) => {
                                events_.items = [newEvent, ...events_.items]
                                return events_
                            })
                            unseenEventsLength.update((v) => (v += 1))

                            if (
                                newEvent.expand?.inviter?.id
                                === data.loggedInUser.id
                            ) {
                                data.loggedInUser.invitedUsers = [
                                    ...data.loggedInUser.invitedUsers,
                                    newEvent.expand.user.id,
                                ]
                            }
                        } else if (e.action === "delete") {
                            events.update((events_) => {
                                events_.items = events_.items.filter(
                                    (m) => m.id !== e.record.id,
                                )
                                return events_
                            })
                            unseenEventsLength.update((v) => (v -= 1))
                        }
                    },
                    { requestKey: "events-subscribe" },
                ),
            ])
        } catch (e) {
            if (e instanceof ClientResponseError) {
                pbHandleClientResponseError(e)
            }
            throw e
        }
    })

    onDestroy(async () => {
        await Promise.all([
            pb._.collection("messages").unsubscribe(),
            pb._.collection("events").unsubscribe(),
        ])
    })
</script>

<Header
    loggedInUser={data.loggedInUser}
    tiers={data.tiers}
    pbEvents={data.events}
    pbMessages={data.messages}
/>

<AnimatePageNavigation
    class="min-h-screen-minus-header container grid content-start items-start py-12"
>
    {@render children()}
</AnimatePageNavigation>

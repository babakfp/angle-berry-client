<script lang="ts">
    import { onDestroy, onMount } from "svelte"
    import AnimatePageNavigation from "$lib/components/AnimatePageNavigation.svelte"
    import Header from "$lib/parts/Header/Header.svelte"
    import { getLoggedInUser } from "$lib/remotes/getLoggedInUser.remote"
    import { events, unseenEventsLength } from "$lib/stores/events.svelte"
    import { messages, unreadMessagesLength } from "$lib/stores/messages.svelte"
    import { pb } from "$lib/stores/pb.svelte"
    import {
        pbHandleError,
        type MessagesResponse,
        type TiersResponse,
        type UsersResponse,
    } from "$lib/utilities/pb"

    let { children } = $props()

    const loggedInUser = await getLoggedInUser()

    onMount(async () => {
        try {
            await Promise.all([
                pb._.collection("messages").subscribe(
                    "*",
                    async (e) => {
                        if (e.action === "update") {
                            if (messages._) {
                                messages._.items = messages._.items.map(
                                    (msg) => {
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
                                    },
                                )
                            }
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

                            if (messages._) {
                                messages._.items = [
                                    {
                                        ...e.record,
                                        expand: {
                                            user: userRecord,
                                            repliedTo: repliedToRecord,
                                        },
                                    },
                                    ...messages._.items,
                                ]
                            }

                            if (e.record.user !== loggedInUser.id) {
                                unreadMessagesLength._ += 1
                            }
                        } else if (e.action === "delete") {
                            if (messages._) {
                                messages._.items = messages._.items.filter(
                                    (m) => m.id !== e.record.id,
                                )
                            }
                            if (e.record.user !== loggedInUser.id) {
                                unreadMessagesLength._ -= 1
                            }
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
                            if (events._) {
                                events._.items = [newEvent, ...events._.items]
                            }
                            unseenEventsLength._ += 1

                            if (
                                newEvent.expand?.inviter?.id === loggedInUser.id
                            ) {
                                loggedInUser.invitedUsers = [
                                    ...loggedInUser.invitedUsers,
                                    newEvent.expand.user.id,
                                ]
                            }
                        } else if (e.action === "delete") {
                            if (events._) {
                                events._.items = events._.items.filter(
                                    (m) => m.id !== e.record.id,
                                )
                            }
                            unseenEventsLength._ -= 1
                        }
                    },
                    { requestKey: "events-subscribe" },
                ),
            ])
        } catch (e) {
            throw pbHandleError(e)
        }
    })

    onDestroy(async () => {
        await Promise.all([
            pb._.collection("messages").unsubscribe(),
            pb._.collection("events").unsubscribe(),
        ])
    })
</script>

<Header {loggedInUser} />

<AnimatePageNavigation
    class="min-h-dvh-minus-header container grid content-start items-start pt-12 pb-24"
>
    {@render children()}
</AnimatePageNavigation>

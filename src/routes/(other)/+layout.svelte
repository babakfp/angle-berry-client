<script lang="ts">
    import { onMount } from "svelte"
    import { fly } from "svelte/transition"
    import { page } from "$app/stores"
    import { pageTransitionValues } from "$utilities/pageTransitionValues"
    import { messages, unreadMessagesLength } from "$stores/messages"
    import { events, unseenEventsLength } from "$stores/events"
    import { pbHandleClientResponseError } from "$utilities/pb"
    import { pb } from "$stores/pb"
    import Header from "$parts/Header/Header.svelte"
    import {
        type RecordSubscription,
        type CustomMessagesResponse,
        type CustomEventsResponse,
        type MessagesResponse,
        type EventsResponse,
        ClientResponseError,
    } from "$utilities/pb-types"

    export let data

    onMount(async () => {
        try {
            await $pb.collection("messages").subscribe(
                "*",
                async (_data: RecordSubscription<MessagesResponse>) => {
                    if (_data.action === "update") {
                        messages.update(_messages => {
                            _messages.items = _messages.items.map(msg => {
                                if (msg.id === _data.record.id) {
                                    msg.content = _data.record.content
                                    msg.updated = _data.record.updated
                                }
                                if (
                                    msg.expand?.repliedTo?.id ===
                                    _data.record.id
                                ) {
                                    msg.expand.repliedTo.content =
                                        _data.record.content
                                    msg.expand.repliedTo.updated =
                                        _data.record.updated
                                }
                                return msg
                            })
                            return _messages
                        })
                    } else if (_data.action === "create") {
                        const userRecord = await $pb
                            .collection("users")
                            .getOne(_data.record.user)
                        let repliedToRecord
                        if (_data.record.repliedTo) {
                            repliedToRecord = await $pb
                                .collection("messages")
                                .getOne(_data.record.repliedTo, {
                                    expand: "user",
                                })
                        }
                        _data.record.expand = {
                            user: userRecord,
                            repliedTo: repliedToRecord ? repliedToRecord : "",
                        }

                        messages.update(_messages => {
                            _messages.items = [
                                _data.record as CustomMessagesResponse,
                                ..._messages.items,
                            ]
                            return _messages
                        })
                        unreadMessagesLength.update(v => (v += 1))
                    } else if (_data.action === "delete") {
                        messages.update(_messages => {
                            _messages.items = _messages.items.filter(
                                m => m.id !== _data.record.id,
                            )
                            return _messages
                        })
                        unreadMessagesLength.update(v => (v -= 1))
                    }
                },
                { requestKey: "messages-subscribe" },
            )
            await $pb.collection("events").subscribe(
                "*",
                async (_data: RecordSubscription<EventsResponse>) => {
                    if (_data.action === "create") {
                        const userRecord = await $pb
                            .collection("users")
                            .getOne(_data.record.user, {
                                expand: "retainedTiers",
                                $autoCancel: false,
                            })
                        let inviterRecord
                        if (_data.record.inviter)
                            inviterRecord = await $pb
                                .collection("users")
                                .getOne(_data.record.inviter, {
                                    expand: "retainedTiers",
                                    $autoCancel: false,
                                })
                        _data.record.expand = {
                            user: userRecord,
                            ...(inviterRecord
                                ? { inviter: inviterRecord }
                                : {}),
                        }
                        events.update(_events => {
                            _events.items = [
                                _data.record as CustomEventsResponse,
                                ..._events.items,
                            ]
                            return _events
                        })
                        unseenEventsLength.update(v => (v += 1))

                        if (
                            (_data.record as CustomEventsResponse).expand
                                ?.inviter?.id === data.user.id
                        ) {
                            data.user.invitedUsers = [
                                ...data.user.invitedUsers,
                                (_data.record as CustomEventsResponse).expand
                                    .user.id,
                            ]
                        }
                    } else if (_data.action === "delete") {
                        events.update(_events => {
                            _events.items = _events.items.filter(
                                m => m.id !== _data.record.id,
                            )
                            return _events
                        })
                        unseenEventsLength.update(v => (v -= 1))
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
</script>

<Header />

{#key $page.url.pathname}
    <main
        class="container grid min-h-screen-minus-header content-start items-start py-12"
        in:fly={pageTransitionValues}
    >
        <slot />
    </main>
{/key}

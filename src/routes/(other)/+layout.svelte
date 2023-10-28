<script>
    import { onMount } from "svelte"
    import { fly } from "svelte/transition"
    import { page } from "$app/stores"
    import { pageTransitionValues } from "$stores/pageTransitionValues.js"
    import { messages, unreadMessagesLength } from "$stores/messages.js"
    import { events, unseenEventsLength } from "$stores/events.js"
    import { error } from "@sveltejs/kit"
    import { handleOfflineFailure } from "$utilities/pb/helpers.js"
    import { pb } from "$stores/pb.js"
    import Header from "$parts/Header/Header.svelte"

    export let data

    onMount(async () => {
        try {
            await $pb
                .collection("messages")
                .subscribe("*", async ({ action, record }) => {
                    if (action === "update") {
                        messages.update(msgs => {
                            msgs.map(msg => {
                                if (msg.id === record.id) {
                                    msg.content = record.content
                                    msg.updated = record.updated
                                }
                                if (msg.expand?.repliedTo?.id === record.id) {
                                    msg.expand.repliedTo.content =
                                        record.content
                                    msg.expand.repliedTo.updated =
                                        record.updated
                                }
                            })
                            return msgs
                        })
                    } else if (action === "create") {
                        const userRecord = await $pb
                            .collection("users")
                            .getOne(record.user)
                        let repliedToRecord
                        if (record.repliedTo) {
                            repliedToRecord = await $pb
                                .collection("messages")
                                .getOne(record.repliedTo, { expand: "user" })
                        }
                        record.expand = {
                            user: userRecord,
                            repliedTo: repliedToRecord
                                ? repliedToRecord
                                : undefined,
                        }
                        messages.update(v => [record, ...v])
                        unreadMessagesLength.update(v => (v += 1))
                    } else if (action === "delete") {
                        messages.update(v => v.filter(m => m.id !== record.id))
                        unreadMessagesLength.update(v => (v -= 1))
                    }
                })
            await $pb
                .collection("events")
                .subscribe("*", async ({ action, record }) => {
                    if (action === "create") {
                        const userRecord = await $pb
                            .collection("users")
                            .getOne(record.user, {
                                expand: "retainedTiers",
                                $autoCancel: false,
                            })
                        let inviterRecord
                        if (record.inviter)
                            inviterRecord = await $pb
                                .collection("users")
                                .getOne(record.inviter, {
                                    expand: "retainedTiers",
                                    $autoCancel: false,
                                })
                        record.expand = {
                            user: userRecord,
                            ...(inviterRecord
                                ? { inviter: inviterRecord }
                                : {}),
                        }
                        events.update(v => [record, ...v])
                        unseenEventsLength.update(v => (v += 1))

                        if (record.expand.inviter.id === data.user.id) {
                            data.user.invitedUsers = [
                                ...data.user.invitedUsers,
                                record.expand.user.id,
                            ]
                        }
                    } else if (action === "delete") {
                        events.update(v => v.filter(m => m.id !== record.id))
                        unseenEventsLength.update(v => (v -= 1))
                    }
                })
        } catch ({ status, response }) {
            handleOfflineFailure(status)
            throw error(status, response.message)
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

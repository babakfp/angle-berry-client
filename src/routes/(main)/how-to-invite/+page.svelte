<script lang="ts">
    import { copyText } from "svelte-copy"
    import toast from "svelte-french-toast"
    import { page } from "$app/stores"
    import Input from "@/lib/components/form/Input.svelte"
    import InputTextButton from "@/lib/components/form/InputTextButton.svelte"

    export let data

    const copyInviteLink = () => {
        copyText(`${$page.url.origin}/register?id=${data.loggedInUser.id}`)
        toast.success("Your invite link is copied to Clipboard.", {
            position: "bottom-right",
        })
    }
</script>

<svelte:head>
    <title>How to invite</title>
</svelte:head>

<h1 class="text-4xl font-bold text-white">How to invite</h1>

<div class="mt-8 space-y-4">
    <Input
        name="userInviteLink"
        label="Your invite link"
        value="{$page.url.origin}/register?id={data.loggedInUser.id}"
        readonly
    >
        <InputTextButton slot="buttons" text="Copy" on:click={copyInviteLink} />
    </Input>
    <p>
        You can share your invite link with your friends or on social media
        platforms. When someone registers on our website with your invite link,
        you will get a point added to your invites.
    </p>
</div>

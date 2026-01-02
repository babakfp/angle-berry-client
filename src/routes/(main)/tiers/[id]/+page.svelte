<script lang="ts">
    import { PUBLIC_PB_URL } from "$env/static/public"
    import * as TiersTable from "$lib/components/TiersTable"
    import Video from "$lib/components/Video.svelte"
    import { loadData } from "./data.remote.js"

    let { data, params } = $props()

    const { tier, isTierAccessed } = await loadData(params.id)
</script>

<svelte:head>
    <title>Tier : {tier.name}</title>
</svelte:head>

<h1 class="text-4xl font-bold text-gray-50">{tier.name}</h1>

<!-- I don't need "tiers" here becaus we only use currentTier -->
<TiersTable.Root class="mt-8">
    <TiersTable.Row loggedInUser={data.loggedInUser} {tier} isCurrent={true} />
</TiersTable.Root>

{#if !isTierAccessed}
    <p class="mt-8">
        You don't have access to this tier. You can invite {tier.invites} users to
        get the access. You currently have {data.loggedInUser.invitedUsers
            .length} invites.
        <a class="link" href="/how-to-invite">Learn how to invite</a>
        . When you had enough invites, please refresh the page and it will unlock
        automatically.
    </p>
{:else if tier.expand?.videos.length}
    <ul class="mt-8 grid gap-8">
        {#each tier.expand?.videos as video}
            <li>
                <Video
                    src="{PUBLIC_PB_URL}/api/files/{video.collectionName}/{video.id}/{video.file}"
                />
            </li>
        {/each}
    </ul>
{:else}
    <p class="mt-8">
        No videos found. This may be because the admins are updating this page,
        so stay tuned for the update!
    </p>
{/if}

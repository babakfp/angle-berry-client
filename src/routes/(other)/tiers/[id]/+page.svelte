<script lang="ts">
    import { PUBLIC_POCKETBASE_URL } from "$env/static/public"
    import TiersTable from "$components/TiersTable.svelte"
    import TiersTableRow from "$components/TiersTableRow.svelte"
    import VideoPlayer from "$components/VideoPlayer.svelte"

    export let data
</script>

<svelte:head>
    <title>{data?.tier.name}</title>
</svelte:head>

<h1 class="text-4xl font-bold text-white">{data?.tier.name}</h1>

<!-- I don't need "tiers" here becaus we only use currentTier -->
<TiersTable class="mt-8">
    <TiersTableRow user={data.user} tier={data.tier} isCurrent={true} />
</TiersTable>

{#if !data.isTierAccessed}
    <p class="mt-8">
        You don't have access to this tier. You can invite {data?.tier.invites} users
        to get the access. You currently have {data?.user.invitedUsers.length} invites.
        <a class="link" href="/how-to-invite">Learn how to invite</a>. When you
        had enough invites, please refresh the page and it will unlock
        automatically.
    </p>
{:else if data.tier.expand?.videos.length}
    <ul class="mt-8 grid gap-8">
        {#each data.tier.expand?.videos as video}
            <li>
                <VideoPlayer
                    src="{PUBLIC_POCKETBASE_URL}/api/files/{video.collectionName}/{video.id}/{video.file}"
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

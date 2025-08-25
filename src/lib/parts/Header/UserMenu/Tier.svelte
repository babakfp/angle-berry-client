<script lang="ts">
    import type { TiersResponse, UsersResponse } from "$lib/utilities/pb"

    let {
        loggedInUser,
        tier,
    }: {
        loggedInUser: UsersResponse
        tier: TiersResponse
    } = $props()
</script>

<li class="relative">
    <a
        class="group outline-inset flex justify-between gap-4 px-4 py-2 duration-200 hover:text-gray-50"
        href="/tiers/{tier.id}"
    >
        <span class="underline">
            {tier.name}
        </span>
        <div>
            {#if loggedInUser.retainedTiers.includes(tier.id) || loggedInUser.invitedUsers.length >= tier.invites}
                <span>Watch now</span>
            {:else}
                <span class="group-hover:hidden">Locked</span>
                <span class="hidden group-hover:inline-block">Unlock?</span>
            {/if}
        </div>
    </a>
</li>

<style>
    @reference "../../../app.css";

    li:first-of-type a {
        @apply pt-4;
    }
    li:last-of-type a {
        @apply pb-4;
    }
</style>

<script lang="ts">
    import type { TiersResponse, UsersResponse } from "$lib/utilities/pb/types"

    export let loggedInUser: UsersResponse
    export let tier: TiersResponse
</script>

<li class="relative">
    <a
        class="group flex justify-between gap-4 px-4 py-2 duration-200 outline-inset hover:text-gray-50"
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

<style lang="postcss">
    li:first-of-type a {
        @apply pt-4;
    }
    li:last-of-type a {
        @apply pb-4;
    }
</style>

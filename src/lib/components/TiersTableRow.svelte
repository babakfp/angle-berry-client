<script lang="ts">
    import { Td, Th, Tr } from "$lib/components/table/index"
    import type { TiersResponse, UsersResponse } from "$lib/utilities/pb/types"

    export let loggedInUser: UsersResponse
    export let tier: TiersResponse
    export let isCurrent = false

    // Does the logged-in user has access to this tier
    const hasAccess =
        loggedInUser.retainedTiers.includes(tier.id) ||
        loggedInUser.invitedUsers.length >= tier.invites
</script>

<Tr
    class="relative {!isCurrent
        ? 'duration-200 hover:bg-gray-700 not-last:border-b not-last:border-white/5'
        : ''}"
>
    <Th class="py-4 text-white">
        {tier.name}
    </Th>
    <Td class="px-6 py-4">
        {#if tier.price === 0 && tier.invites === 0}
            Free
        {:else}
            ${tier.price} or {tier.invites} invites
        {/if}
    </Td>
    <Td class="text-right">
        {#if hasAccess}
            {#if !isCurrent}
                <span
                    class="px-6 py-4 underline duration-200 group-hover/tr:text-white"
                >
                    Watch now
                </span>
            {:else}
                <span class="px-6 py-4">Accessed</span>
            {/if}
        {:else}
            <div class="flex items-center justify-end pl-4">
                <a
                    class="link relative z-1 block px-2 py-4 outline-inset"
                    href="/how-to-pay"
                >
                    Pay
                </a>
                or
                <a
                    class="link relative z-1 block py-4 pl-2 pr-6 outline-inset"
                    href="/how-to-invite"
                >
                    Start inviting
                </a>
            </div>
        {/if}
    </Td>

    {#if !isCurrent}
        <a
            class="absolute inset-0 rounded-b outline-inset"
            href="/tiers/{tier.id}"
            aria-label="View"
        />
    {/if}
</Tr>

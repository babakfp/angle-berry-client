<script lang="ts">
    import { Td, Th, Tr } from "$lib/components/table"
    import type { TiersResponse, UsersResponse } from "$lib/utilities/pb"

    let {
        loggedInUser,
        tier,
        isCurrent,
    }: {
        loggedInUser: UsersResponse
        tier: TiersResponse
        isCurrent?: boolean
    } = $props()

    // Does the logged-in user has access to this tier
    const hasAccess =
        loggedInUser.retainedTiers.includes(tier.id) ||
        loggedInUser.invitedUsers.length >= tier.invites
</script>

<Tr class={!isCurrent ? "not-last:border-b not-last:border-gray-50/5" : ""}>
    <Th
        class="text-gray-50 {isCurrent ? 'py-4' : ''}"
        containsAnchor={!isCurrent}
    >
        {#if isCurrent}
            {tier.name}
        {:else}
            <a
                class="link inline-block px-6 py-4 outline-inset"
                href="/tiers/{tier.id}"
            >
                {tier.name}
            </a>
        {/if}
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
                <a
                    class="link inline-block px-6 py-4 outline-inset"
                    href="/tiers/{tier.id}"
                >
                    Watch now
                </a>
            {:else}
                <span class="px-6 py-4">Accessed</span>
            {/if}
        {:else}
            <div class="flex items-center justify-end pl-4">
                <a
                    class="link inline-block py-4 pl-4 pr-2 outline-inset"
                    href="/how-to-pay"
                >
                    Pay
                </a>
                or
                <a
                    class="link inline-block py-4 pl-2 pr-6 outline-inset"
                    href="/how-to-invite"
                >
                    Start inviting
                </a>
            </div>
        {/if}
    </Td>
</Tr>

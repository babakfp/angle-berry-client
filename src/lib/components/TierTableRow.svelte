<script lang="ts">
    import { page } from "$app/stores"
    import type { TiersResponse } from "$utilities/pb-types"
    import { Tr, Th, Td } from "$components/table/index"

    export let currentTier: TiersResponse
    export let isShowingSingleTier = false

    // Does current user has access to this tier
    const hasAccess =
        $page.data.user.retainedTiers.includes(currentTier.id) ||
        $page.data.user.invitedUsers.length >= currentTier.invites
</script>

<Tr
    class="group relative {!isShowingSingleTier
        ? 'duration-200 hover:bg-white/10 not-last:border-b not-last:border-white/5'
        : ''}"
>
    <Th class="py-4 text-white">
        {currentTier.name}
    </Th>
    <Td class="px-6 py-4">
        {#if currentTier.price === 0 && currentTier.invites === 0}
            Free
        {:else}
            ${currentTier.price} or {currentTier.invites} invites
        {/if}
    </Td>
    <Td class="text-right">
        {#if hasAccess}
            {#if !isShowingSingleTier}
                <span
                    class="px-6 py-4 underline duration-200 group-hover:text-white"
                >
                    Watch now
                </span>
            {:else}
                <span class="px-6 py-4">Have access</span>
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

    {#if !isShowingSingleTier}
        <a
            class="absolute inset-0 outline-inset"
            href="/tiers/{currentTier.id}"
            aria-label="View"
        />
    {/if}
</Tr>

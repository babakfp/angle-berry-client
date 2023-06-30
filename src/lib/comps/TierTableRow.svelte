<script>
    import { page } from "$app/stores"

    export let currentTier
    export let isShowingSingleTier = false

    // Does current user has access to this tier
    const hasAccess =
        $page.data.user.retainedTiers.includes(currentTier.id) ||
        $page.data.user.invitedUsers.length >= currentTier.invites
</script>

<tr
    class="group relative duration-200
	{!isShowingSingleTier &&
        'hover:bg-white/5 not-last:border-b not-last:border-white/5'}"
>
    <th class="px-6 py-4 text-white">
        {currentTier.name}
    </th>
    <td class="px-6 py-4">
        {#if currentTier.price === 0 && currentTier.invites === 0}
            Free
        {:else}
            ${currentTier.price} or {currentTier.invites} invites
        {/if}
    </td>
    <td class="p-0 text-right">
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
            <div class="flex items-center justify-end px-4">
                <a
                    class="link relative z-1 block px-2 py-4 outline-inset"
                    href="/how-to-pay"
                >
                    Pay
                </a>
                or
                <a
                    class="link relative z-1 block px-2 py-4 outline-inset"
                    href="/how-to-invite"
                >
                    Start inviting
                </a>
            </div>
        {/if}
    </td>

    {#if !isShowingSingleTier}
        <a
            class="absolute inset-0 outline-inset"
            href="/tiers/{currentTier.id}"
        />
    {/if}
</tr>

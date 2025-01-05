<script lang="ts">
    import type { Snippet } from "svelte"

    let {
        title,
        description,
        footerText,
        footerLinkText,
        FooterLinkHref,
        children,
    }: {
        title: string
        description: string
        footerText: string
        footerLinkText: string
        FooterLinkHref: string
        children: Snippet
    } = $props()
</script>

<h1 class="text-4xl font-bold text-gray-50">{title}</h1>
<p class="mt-2 text-gray-400">{description}</p>

<div class="mt-8">
    {@render children()}
</div>

<p class="mt-8 text-sm text-gray-400">
    {footerText}
    <a class="text-gray-50 underline" href={FooterLinkHref}>
        {footerLinkText}
    </a>
</p>

<script>
    export let title
    export let description
    export let otherAuthPageTitle
    export let otherAuthPageLinkTitle
    export let otherAuthPageLink
</script>

<h1 class="text-4xl font-bold text-white">{title}</h1>
<p class="text-gray-400">{description}</p>

<div class="mt-8">
    <slot />
</div>

<p class="mt-8 text-sm text-gray-400">
    {otherAuthPageTitle}
    <a class="text-white underline" href={otherAuthPageLink}>
        {otherAuthPageLinkTitle}
    </a>
</p>

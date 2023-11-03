<script lang="ts">
    export let title: string
    export let description: string
    export let otherAuthPageTitle: string
    export let otherAuthPageLinkTitle: string
    export let otherAuthPageLink: string
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

<script lang="ts">
    import { page } from "$app/stores"

    let {
        title,
        description,
        children,
    }: {
        title: string
        description: string
        children?: Snippet
    } = $props()

    let footerText = $state("")
    let footerLinkText = $state("")
    let FooterLinkHref = $state("")

    if ($page.url.pathname === "/login") {
        footerText = "Don't have an account?"
        footerLinkText = "Register here"
        FooterLinkHref = "/register"
    }

    if ($page.url.pathname === "/register") {
        footerText = "Already have an account?"
        footerLinkText = "Login here"
        FooterLinkHref = "/login"
    }
</script>

<h1 class="text-4xl font-bold text-gray-50">{title}</h1>
<p class="mt-2 text-gray-400">{description}</p>

<div class="mt-8">
    {@render children?.()}
</div>

<p class="mt-8 text-sm text-gray-400">
    {footerText}
    <a class="text-gray-50 underline" href={FooterLinkHref}>
        {footerLinkText}
    </a>
</p>

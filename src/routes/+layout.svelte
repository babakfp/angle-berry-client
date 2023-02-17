<script>
	import { onMount } from "svelte"
	import preventSavingPage from "$lib/dom/preventSavingPage.js"
	import disableContextMenu from "$lib/dom/disableContextMenu.js"
	import preventOpeningDevTools from "$lib/dom/preventOpeningDevTools.js"
	import preventPrinting from "$lib/dom/preventPrinting.js"
	import preventViewPageSource from "$lib/dom/preventViewPageSource.js"
	import "../app.postcss"

	onMount(() => {
		if (process.env.NODE_ENV === "production") {
			preventSavingPage()
			disableContextMenu()
			preventOpeningDevTools()
			preventPrinting()
			preventViewPageSource()
		}
	})
</script>

<slot />

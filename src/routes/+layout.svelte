<script>
	import { onMount } from "svelte"
	import preventSavingPage from "$utils/disableBrowserDefaults/preventSavingPage.js"
	import disableContextMenu from "$utils/disableBrowserDefaults/disableContextMenu.js"
	import preventOpeningDevTools from "$utils/disableBrowserDefaults/preventOpeningDevTools.js"
	import preventPrinting from "$utils/disableBrowserDefaults/preventPrinting.js"
	import preventViewPageSource from "$utils/disableBrowserDefaults/preventViewPageSource.js"
	import LoadingBar from "$lib/LoadingBar.svelte"
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

<LoadingBar />
<slot />

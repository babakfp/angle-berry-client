import adapter from "@sveltejs/adapter-auto"
import preprocess from "svelte-preprocess"

export default {
	kit: {
		adapter: adapter(),
		alias: {
			$stores: "src/lib/stores",
		},
	},
	preprocess: [preprocess({ postcss: true })],
	onwarn: (warning, handler) => {
		if (warning.code.startsWith("a11y-")) return
		handler(warning)
	},
}

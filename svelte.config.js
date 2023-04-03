import adapter from "@sveltejs/adapter-auto"
import { vitePreprocess } from "@sveltejs/kit/vite"

export default {
	kit: {
		adapter: adapter(),
		alias: {
			$stores: "src/lib/stores",
			$icons: "src/lib/Icons",
		},
	},
	preprocess: vitePreprocess(),
	onwarn: (warning, handler) => {
		if (warning.code.startsWith("a11y-")) return
		handler(warning)
	},
}

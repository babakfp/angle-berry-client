import adapter from "@sveltejs/adapter-vercel"
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte"

/** @type {import("@sveltejs/kit").Config} */
export default {
    kit: {
        adapter: adapter(),
        alias: { "@": "./src" },
    },
    preprocess: vitePreprocess(),
    onwarn: (warning, handler) => {
        if (
            warning.code.startsWith("a11y-") ||
            warning.code === "avoid-mouse-events-on-document"
        )
            return
        handler(warning)
    },
}

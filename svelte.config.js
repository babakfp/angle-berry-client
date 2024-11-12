import adapter from "@sveltejs/adapter-vercel"
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte"

/** @type {import("@sveltejs/kit").Config} */
export default {
    kit: {
        adapter: adapter(),
    },
    preprocess: vitePreprocess(),
    onwarn: (warning, handler) => {
        if (
            warning.code.startsWith("a11y_") ||
            warning.code === "avoid_mouse_events_on_document"
        )
            return
        handler(warning)
    },
}

import adapter from "@sveltejs/adapter-vercel"
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte"

/** @type {import("@sveltejs/kit").Config} */
export default {
    kit: {
        adapter: adapter(),
        experimental: {
            remoteFunctions: true,
        },
    },
    preprocess: vitePreprocess(),
    compilerOptions: {
        discloseVersion: false,
        modernAst: true,
        warningFilter: (warning) => {
            return (
                !warning.code.startsWith("a11y_")
                && warning.code !== "avoid_mouse_events_on_document"
                && warning.code !== "state_referenced_locally"
            )
        },
        experimental: {
            async: true,
        },
    },
}

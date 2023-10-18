import adapter from "@sveltejs/adapter-vercel"
import { vitePreprocess } from "@sveltejs/kit/vite"

export default {
    kit: {
        adapter: adapter(),
        alias: {
            $comps: "src/lib/comps",
            $icons: "src/lib/comps/icons",
            $parts: "src/lib/parts",
            $stores: "src/lib/stores",
            $utilities: "src/lib/utilities",
        },
    },
    preprocess: vitePreprocess(),
    onwarn: (warning, handler) => {
        if (warning.code.startsWith("a11y-")) return
        handler(warning)
    },
}

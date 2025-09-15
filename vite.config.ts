import child_process from "node:child_process"
import path from "node:path"
import { sveltekit } from "@sveltejs/kit/vite"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig, type Plugin } from "vite"

export default defineConfig({
    plugins: [tailwindcss(), sveltekit(), errorDotHTML()],
})

function errorDotHTML(): Plugin {
    const buildStyles = (i: string, o: string, c?: () => void) => {
        const command = `tailwindcss -i ${i} -o ${o} -m`
        child_process.exec(command, (error) =>
            error ? console.log(error) : c?.(),
        )
    }

    const i = path.join(process.cwd(), "src", "lib", "app.css")
    const o = path.join(process.cwd(), "static", "error.css")
    const e = path.join(process.cwd(), "src", "error.html")

    return {
        name: "vite-plugin-use-tailwindcss-for-sveltekit-error-dot-html",
        configureServer: (server) => {
            server.watcher.on("change", (path) => {
                if (path !== e) return
                buildStyles(i, o, () => {
                    server.ws.send({ type: "full-reload" })
                })
            })
        },
        buildStart: () => {
            buildStyles(i, o)
        },
    }
}

/** @type {import("prettier").Config & import("prettier-plugin-svelte").PluginConfig & import("@trivago/prettier-plugin-sort-imports").PluginConfig} */
export default {
    semi: false,
    tabWidth: 4,
    plugins: [
        "prettier-plugin-svelte",
        "prettier-plugin-tailwindcss",
        "@trivago/prettier-plugin-sort-imports",
    ],
    importOrder: ["^@", "^[^$\\.\\/]", "^\\$", "^\\.\\.", "^\\."],
    importOrderSortSpecifiers: true,
}

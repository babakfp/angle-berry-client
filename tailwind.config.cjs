const colors = require("tailwindcss/colors")
const defaultTheme = require("tailwindcss/defaultTheme")
const {
    default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette")
const tailwindcssAddons = require("tailwindcss-addons")

module.exports = {
    content: ["./src/**/*.{html,js,svelte}"],
    presets: [tailwindcssAddons({ dynamicViewFix: true })],
    theme: {
        extend: {
            spacing: {
                "header-height": "var(--header-height)",
            },
        },
        colors: {
            current: colors.current,
            white: colors.white,
            red: colors.red,
            gray: {
                300: colors.zinc[300],
                400: colors.zinc[400],
                500: colors.zinc[500],
                600: colors.zinc[600],
                700: colors.zinc[700],
                800: colors.zinc[800],
            },
        },
        container: {
            center: true,
            padding: "1rem",
        },
        borderRadius: {
            none: "0px",
            DEFAULT: "0.375rem",
            full: "9999px",
        },
        fontFamily: {
            sans: ['"JosefinSans"', defaultTheme.fontFamily.sans],
        },
        fontWeight: {
            semibold: "600",
            bold: "700",
        },
        outlineWidth: {
            2: "2px",
        },
    },
    plugins: [
        ({ addUtilities }) => {
            addUtilities({
                ".outline-inset": {
                    "@apply -outline-offset-2": "",
                },
            })
        },
        ({ addComponents }) => {
            addComponents({
                ".link": {
                    "@apply underline duration-200 hover:text-white": "",
                },
            })
        },
        ({ addComponents }) => {
            addComponents({
                ".btn": {
                    // prettier-ignore
                    "@apply relative inline-flex items-center justify-center rounded py-1.5 px-3 text-sm text-white duration-200 drag-none": "",
                },
                ".btn-danger": {
                    "@apply bg-red-600 hover:bg-red-500": "",
                },
                ".btn-gray": {
                    "@apply bg-gray-600 hover:bg-gray-500": "",
                },
            })
        },
        ({ matchUtilities, theme }) => {
            matchUtilities(
                {
                    highlight: value => ({
                        "box-shadow": `inset 0 0 0 1px ${value}`,
                    }),
                },
                {
                    values: flattenColorPalette(theme("backgroundColor")),
                    type: "color",
                }
            )
        },
    ],
}

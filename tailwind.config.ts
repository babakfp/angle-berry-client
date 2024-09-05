import type { Config } from "tailwindcss"
import { allAddons } from "tailwindcss-addons"
import colors from "tailwindcss/colors"

export default {
    content: ["./src/**/*.{html,svelte}"],
    theme: {
        extend: {
            spacing: {
                header: "var(--header)",
            },
            height: {
                "screen-minus-header": "var(--screen-minus-header)",
            },
            minHeight: {
                "screen-minus-header": "var(--screen-minus-header)",
            },
            maxHeight: {
                "screen-minus-header": "var(--screen-minus-header)",
            },
        },
        colors: {
            current: colors.current,
            red: colors.red,
            gray: {
                50: colors.zinc[50],
                400: colors.zinc[400],
                500: colors.zinc[500],
                600: colors.zinc[600],
                700: colors.zinc[700],
            },
            body: {
                text: colors.zinc[300],
                bg: colors.zinc[800],
            },
            blue: colors.blue,
            green: colors.green,
            transparent: colors.transparent,
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
            sans: ["Recursive"],
            mono: ["Recursive", { fontVariationSettings: "'MONO' 1" }],
        },
        fontWeight: {
            semibold: "600",
            bold: "700",
        },
    },
    plugins: [
        ...allAddons(),
        ({ addUtilities, addComponents }) => [
            addUtilities({ ".outline-inset": {} }),
            addComponents({ ".link": {} }),
            addComponents({
                ".btn": {},
                ".btn-gray-light": {},
                ".btn-gray-light-glass": {},
                ".btn-gray-light-outline": {},
                ".btn-gray": {},
                ".btn-gray-glass": {},
                ".btn-gray-outline": {},
                ".btn-brand": {},
                ".btn-danger": {},
            }),
            addUtilities({
                ".reset-autofill-input": {
                    "-webkit-background-clip": "text",
                    "-webkit-text-fill-color": "theme(colors.body.text)",
                    "box-shadow": "inset 0 0 0 9999px theme(colors.body.bg)",
                    "caret-color": "theme(colors.body.text)",
                },
            }),
        ],
    ],
} satisfies Config

import colors from "tailwindcss/colors"
import defaultTheme from "tailwindcss/defaultTheme"
import tailwindcssAddons from "tailwindcss-addons"

/** @type {import("tailwindcss").Config} */
export default {
    content: ["./src/**/*.{html,js,svelte}"],
    presets: [
        tailwindcssAddons({
            presets: {
                screenToDynamicScreen: true,
            },
        }),
    ],
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
            body: {
                bg: colors.zinc[800],
                text: colors.zinc[300],
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
            sans: ["JosefinSans", defaultTheme.fontFamily.sans],
        },
        fontWeight: {
            semibold: "600",
            bold: "700",
        },
    },
    plugins: [outlineInsetUtility(), linkComponents(), buttonComponents()],
}

function outlineInsetUtility() {
    return ({ addUtilities }) => {
        addUtilities({
            ".outline-inset": {},
        })
    }
}

function linkComponents() {
    return ({ addComponents }) => {
        addComponents({
            ".link": {},
        })
    }
}

function buttonComponents() {
    return ({ addComponents }) => {
        addComponents({
            ".btn": {},
            ".btn-danger": {},
            ".btn-gray": {},
            ".btn-brand": {},
        })
    }
}

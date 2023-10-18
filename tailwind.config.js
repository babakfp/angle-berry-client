import colors from "tailwindcss/colors"
import defaultTheme from "tailwindcss/defaultTheme"
import tailwindcssAddons from "tailwindcss-addons"

export default {
    content: ["./src/**/*.{html,js,svelte}"],
    presets: [
        tailwindcssAddons({
            presets: {
                screenSizeFix: true,
            },
        }),
    ],
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
        })
    }
}

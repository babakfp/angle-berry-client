const colors = require("tailwindcss/colors")
const defaultTheme = require("tailwindcss/defaultTheme")
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
            gray: colors.zinc,
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
        outlineWidth: {
            2: "2px",
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

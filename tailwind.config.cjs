const colors = require("tailwindcss/colors")
const defaultTheme = require("tailwindcss/defaultTheme")
const tailwindcssAddons = require("tailwindcss-addons")
const {
	default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette")

module.exports = {
	content: ["./src/**/*.{html,js,svelte}"],
	presets: [tailwindcssAddons()],
	theme: {
		extend: {
			spacing: {
				"header-height": "var(--header-height)",
			},
			height: {
				screen: "var(--hscreen)",
			},
			maxHeight: {
				screen: "var(--hscreen)",
			},
			minHeight: {
				screen: "var(--hscreen)",
			},
			width: {
				screen: "var(--wscreen)",
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
		require("@tailwindcss/line-clamp"),
		({ addUtilities }) => {
			addUtilities({
				".outline-inset": {
					"@apply -outline-offset-2": "",
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

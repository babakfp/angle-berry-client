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
				"header-height": "4rem",
			},
		},
		colors: {
			current: colors.current,
			white: colors.white,
			gray: {
				300: colors.zinc[300],
				400: colors.zinc[400],
				500: colors.zinc[500],
				700: colors.zinc[700],
				800: colors.zinc[800],
			},
			error: colors.red[600],
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
		},
	},
	plugins: [
		require("@tailwindcss/line-clamp"),
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

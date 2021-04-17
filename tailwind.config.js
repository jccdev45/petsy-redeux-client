module.exports = {
	purge: ["./src/**/*.js"],
	theme: {
		extend: {
			fontFamily: {
				serif: ["Playfair Display", "serif"],
				sans: ["sans-serif"],
			},
		},
	},
	variants: {
		margin: ["first", "last", "responsive"],
	},
	plugins: [
		require("@tailwindcss/forms")({
			strategy: "class",
		}),
		require("@tailwindcss/typography"),
	],
};

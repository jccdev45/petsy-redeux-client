module.exports = {
	purge: ["./src/**/*.js"],
	theme: {
		extend: {
			colors: {
				primary: {
					DEFAULT: "#ef9a9a",
					light: "#ffcccb",
					dark: "#ba6b6c",
				},
				secondary: {
					DEFAULT: "#9575cd",
					light: "#c7a4ff",
					dark: "#65499c",
				},
			},
			fontFamily: {
				serif: ["Playfair Display", "serif"],
				sans: ["sans-serif"],
			},
		},
	},
	variants: {
		margin: ["first", "last", "responsive"],
		border: ["first", "last"],
	},
	plugins: [
		require("@tailwindcss/forms")({
			strategy: "class",
		}),
	],
};

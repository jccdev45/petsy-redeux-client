module.exports = {
	purge: ["./src/**/*.js"],
	theme: {
		extend: {
			colors: {
				secondary: {
					DEFAULT: "#ed80ad",
					light: "#ffb1df",
					dark: "#b8507e",
				},
				primary: {
					DEFAULT: "#d6a1ff",
					light: "#ffd3ff",
					dark: "#a372cb",
				},
				// primary: {
				// 	DEFAULT: "#ef9a9a",
				// 	light: "#ffcccb",
				// 	dark: "#ba6b6c",
				// },
				// secondary: {
				// 	DEFAULT: "#9575cd",
				// 	light: "#c7a4ff",
				// 	dark: "#65499c",
				// },
			},
			fontFamily: {
				serif: ["serif"],
				sans: ["Open Sans", "sans-serif"],
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

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {},
		colors: {
			empty: "#ffffff",
			wall: "#000000",
			start: "#ff0000",
			end: "#ffff00",
			unknown: "#f0f0f0",
		},
	},
	plugins: [require("@tailwindcss/forms")],
};

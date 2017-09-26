import typescript from "rollup-plugin-typescript2";

export default {
	input: "./src/index.ts",
	output: {
		format: "es",
		file: "./dist/index.js",
	},
	exports: "named",
	external: ["react", "styled-components"],
	plugins: [
		typescript({
			typescript: require("typescript"),
		}),
	],
};

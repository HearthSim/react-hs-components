import typescript from "rollup-plugin-typescript2";

import pkg from "./package.json";

export default {
	input: "./src/index.ts",
	output: [
		{
			file: pkg.main,
			format: "cjs",
			exports: "named",
		},
		{
			file: pkg.module,
			format: "es",
		},
	],
	external: ["react", "styled-components"],
	plugins: [
		typescript({
			typescript: require("typescript"),
			exclude: ["*.d.ts", "**/*.d.ts", "stories/**/*.tsx"]
		}),
	],
};

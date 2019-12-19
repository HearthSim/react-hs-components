import {addDecorator, addParameters, configure} from "@storybook/react";

// tslint:disable-next-line
const { withKnobs } = require("@storybook/addon-knobs");

addDecorator(withKnobs);

addParameters({
	options: {
		name: "react-hs-components",
	},
	backgrounds: [
		{ name: "Dark", value: "#262321", default: true },
		{ name: "Light", value: "#F1ECE9" },
	],
});

// automatically import all files ending in *.stories.tsx
const req = require.context("../stories", true, /.stories.tsx$/);

function loadStories() {
	req.keys()
		.sort()
		.forEach(req);
}

configure(loadStories, module);

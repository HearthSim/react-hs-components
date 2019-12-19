import React from "react";
import TestRenderer from "react-test-renderer";
import Card from "../Card";

describe("Card", () => {
	test("renders correctly", () => {
		const component = TestRenderer.create(<Card id="EX1_001" />);
		const tree = component.toJSON();
		expect(tree).toEqual(
			TestRenderer.create(
				<img src="https://art.hearthstonejson.com/v1/render/latest/enUS/256x/EX1_001.png" />,
			).toJSON(),
		);
	});

	test("resolution prop works", () => {
		const component = TestRenderer.create(
			<Card id="EX1_001" resolution={512} />,
		);
		const tree = component.toJSON();
		expect(tree).toEqual(
			TestRenderer.create(
				<img src="https://art.hearthstonejson.com/v1/render/latest/enUS/512x/EX1_001.png" />,
			).toJSON(),
		);
	});

	test("locale prop works", () => {
		const component = TestRenderer.create(<Card id="EX1_001" locale="frFR" />);
		const tree = component.toJSON();
		expect(tree).toEqual(
			TestRenderer.create(
				<img src="https://art.hearthstonejson.com/v1/render/latest/frFR/256x/EX1_001.png" />,
			).toJSON(),
		);
	});
});

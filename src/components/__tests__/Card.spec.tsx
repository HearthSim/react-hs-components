import React from "react";
import TestRenderer from "react-test-renderer";
import Card from "../Card";

describe("Card", () => {
	it("renders correctly", () => {
		const component = TestRenderer.create(<Card id="EX1_001" />);
		const tree = component.toJSON();
		expect(tree).toEqual(
			TestRenderer.create(
				<img src="https://art.hearthstonejson.com/v1/render/latest/enUS/256x/EX1_001.png" />,
			).toJSON(),
		);
	});

	it("can render at different resolutions", () => {
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

	it("can render localized cards", () => {
		const component = TestRenderer.create(<Card id="EX1_001" locale="frFR" />);
		const tree = component.toJSON();
		expect(tree).toEqual(
			TestRenderer.create(
				<img src="https://art.hearthstonejson.com/v1/render/latest/frFR/256x/EX1_001.png" />,
			).toJSON(),
		);
	});

	it("renders a battlegrounds card", () => {
		const component = TestRenderer.create(<Card id="EX1_506" battlegrounds />);
		const tree = component.toJSON();
		expect(tree).toEqual(
			TestRenderer.create(
				<img src="https://art.hearthstonejson.com/v1/bgs/latest/enUS/256x/EX1_506.png" />,
			).toJSON(),
		);
	});

	it("renders a tripled battlegrounds card", () => {
		const component = TestRenderer.create(
			<Card id="TB_BaconUps_003" battlegrounds triple />,
		);
		const tree = component.toJSON();
		expect(tree).toEqual(
			TestRenderer.create(
				<img src="https://art.hearthstonejson.com/v1/bgs/latest/enUS/256x/TB_BaconUps_003_triple.png" />,
			).toJSON(),
		);
	});
});

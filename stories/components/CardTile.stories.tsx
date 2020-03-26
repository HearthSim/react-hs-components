import { storiesOf } from "@storybook/react";
import * as React from "react";
import styled from "styled-components";
import { CardTile } from "../../src";

// tslint:disable-next-line
const { boolean, select } = require("@storybook/addon-knobs");

const stories = storiesOf("CardTile", module);

const Container = styled.div`
	background: #262321;
	padding: 20px;
	max-width: 300px;
`;

stories.add("Classic", () => {
	return (
		<Container>
			<CardTile
				id="EX1_506"
				name="Murloc Tidehunter"
				cost={select(
					"Cost",
					{
						"1": 1,
						"2": 2,
						"3": 3,
						"4": 4,
						"5": 5,
						"6": 6,
						"7": 7,
						"8": 8,
						"9": 9,
						"10": 10,
						"11": 11,
						"12": 12,
						"25": 25,
					},
					1,
				)}
			/>
		</Container>
	);
});

stories.add("Battlegrounds", () => {
	return (
		<Container>
			<CardTile
				id="EX1_506"
				name="Murloc Tidehunter"
				cost={2}
				tier={select(
					"Tier",
					{
						"1": 1,
						"2": 2,
						"3": 3,
						"4": 4,
						"5": 5,
						"6": 6,
					},
					1,
				)}
				battlegrounds
				premium={boolean("Premium", false)}
			/>
		</Container>
	);
});

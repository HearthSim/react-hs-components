import * as React from "react";
import styled from "styled-components";

export interface CardTileProps extends React.ClassAttributes<CardTile> {
	id: string;
	name: string;
	cost: number;
	icon?: string;
	rarity?: string;
	disabled?: boolean;
	number?: number;
	href?: string;
}

const CardTileWrapper = (styled.div as any)`
	display: flex;
	width: 100%;
	background-color: gray;
	border: solid 1px black;
	filter: ${(props: any) =>
		props.disabled ? `brightness(50%)` : "brightness(100%)"};
	vertical-align: middle;
`;

const CardTileWrapperLink = CardTileWrapper.withComponent("a").extend`

`;

const CardTileTextElement = styled.div`
	color: white;
	font-family: "Chunkfive", sans-serif;
	font-weight: normal;
	text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
		1px 1px 0 #000;
`;

const CardTileNameBase = CardTileTextElement.extend`
	// text
	font-size: 0.8em;
	text-align: left;
	text-overflow: ellipsis;
	white-space: nowrap;

	// layout
	height: 34px;
	line-height: 38px;
	padding: 0 6px;
	flex: 1 0 0;
	overflow: hidden;

	// background
	background-color: #313131;
	background-position: right center;
	background-size: contain;
	background-repeat: no-repeat;

	// icon
	img {
		float: right;
		height: 100%;
		margin-left: 6px;
	}
`;

const CardTileName = CardTileNameBase.extend`
	background-image: linear-gradient(
			65deg,
			#313109,
			#313131 calc(100% - 96px),
			rgba(49, 49, 49, 0) calc(100% - 26px),
			rgba(49, 49, 49, 0)
		),
		${(props: React.HTMLProps<HTMLDivElement> & { cardId: string }) =>
			`url("https://art.hearthstonejson.com/v1/tiles/${props.cardId}.png")`};
`;

const CardTileGem = CardTileTextElement.extend`
	font-size: 1.3em;
	flex: 0 0 auto;
	height: 34px;
	width: 34px;
	line-height: 38px;
	text-align: center;
	float: left;
	position: relative;
	background: ${(
		props: React.HTMLProps<HTMLDivElement> & { rarity?: string },
	) => {
		switch (props.rarity) {
			case "FREE":
			case "COMMON":
				return "#858585";
			case "RARE":
				return "#315376";
			case "EPIC":
				return "#644C82";
			case "LEGENDARY":
				return "#855C25";
			default:
				return "#315376";
		}
	}};
	border-right: solid 1px black;
`;

const CardTileCounter = (CardTileTextElement as any).extend`
	flex: 0 0 auto;
	font-size: 1.2em;
	color: gold;
	text-align: center;
	height: 34px;
	line-height: 38px;
	width: 24px;
	background-color: #313131;
	border-left: solid 1px black;
`;

export default class CardTile extends React.Component<CardTileProps, {}> {
	renderName() {
		return (
			<CardTileName cardId={this.props.id}>
				{this.props.icon ? <img src={this.props.icon} /> : null}
				{this.props.name}
			</CardTileName>
		);
	}

	renderCount() {
		let count =
			typeof this.props.number === "number" ? this.props.number : null;
		if ((count === null || count < 2) && this.props.rarity === "LEGENDARY") {
			return <CardTileCounter>★</CardTileCounter>;
		}
		if (count === null) {
			return;
		}
		return <CardTileCounter>{count}</CardTileCounter>;
	}

	render() {
		const Wrapper = this.props.href ? CardTileWrapperLink : CardTileWrapper;

		return (
			<Wrapper
				href={this.props.href ? "" : undefined}
				disabled={this.props.disabled}
			>
				<CardTileGem rarity={this.props.rarity}>{this.props.cost}</CardTileGem>
				{this.renderName()}
				{this.renderCount()}
			</Wrapper>
		);
	}
}

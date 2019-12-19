import React from "react";
import styled, { injectGlobal } from "styled-components";

export interface CardTileProps extends React.ClassAttributes<CardTile> {
	id: string | null;
	name: string | null;
	cost: number | null;
	icon?: string;
	rarity?: string;
	disabled?: boolean;
	animated?: boolean;
	number?: number;
	showRarity?: boolean;
	href?: string;
	fontFamily?: string;
	fontWeight?: string;
	battlegrounds?: boolean;
	tier?: number | null;
}

const CardTileWrapper = (styled.div as any)`
	display: flex;
	overflow: hidden;
	position: relative;
	width: 100%;
	background-color: gray;
	border: solid 1px black;
	vertical-align: middle;
	font-family: ${(props: any) =>
		props.fontFamily ? props.fontFamily : "sans-serif"};
	font-weight: ${(props: any) => (props.fontWeight ? props.fontWeight : "bold")};
`;

const Darkness = (styled.div as any)`
	display: inherit;
	width: 100%;
	filter: brightness(${(props: any) => (props.disabled ? 50 : 100)}%);
`;

const CardTileWrapperLink = CardTileWrapper.withComponent("a").extend`

`;

const CardTileTextElement = (styled.div as any)`
	color: white;
	text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
		1px 1px 0 #000;
`;

// for some reason styled-components.keyframes breaks the export
injectGlobal`
	@keyframes react-hs-components-fade {
		0% {
			opacity: 0;
		}

		50% {
			opacity: 1;
		}

		100% {
			opacity: 0;
		}
	}
`;

const FlashOverlay = (styled.div as any)`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(255, 254, 179, 0.4);
	opacity: 0;
	transition: opacity;
	animation: react-hs-components-fade 1s linear;

	z-index: 1;
	overflow: hidden;
`;

const CardTileNameBase = CardTileTextElement.extend`
	// text
	font-size: 0.8em;
	text-align: left;
	text-overflow: ellipsis;
	white-space: nowrap;

	// layout
	height: 34px;
	line-height: 34px;
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
		${(props: React.HTMLProps<HTMLDivElement> & { cardId: string | null }) =>
			props.cardId !== null
				? `url("https://art.hearthstonejson.com/v1/tiles/${props.cardId}.png")`
				: "linear-gradient(0deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3))"};
`;

const CardTileGem = CardTileTextElement.extend`
	font-size: 1.3em;
	flex: 0 0 auto;
	height: 34px;
	width: 34px;
	line-height: 34px;
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

const CardTileTier = styled.img`
	height: 34px;
	width: 34px;
	float: left;
	position: relative;
	border-right: solid 1px black;
`;

const CardTileCounter = (CardTileTextElement as any).extend`
	flex: 0 0 auto;
	font-size: 1.2em;
	color: gold;
	text-align: center;
	height: 34px;
	line-height: 34px;
	width: 24px;
	background-color: #313131;
	border-left: solid 1px black;
`;

const SkeletonLine = (styled.span as any)`
	display: inline-block;
	background-color: rgba(255, 255, 255, 0.3);
	border-radius: 1em;
	height: 0.75em;
	width: ${(props: React.HTMLProps<HTMLSpanElement> & { width?: string }) =>
		props.width || 0};
`;

export interface CardTileState {
	flashIndex: number;
	skeletonNameWidth?: string;
}

export default class CardTile extends React.Component<
	CardTileProps,
	CardTileState
> {
	constructor(props: CardTileProps, context: any) {
		super(props, context);
		this.state = {
			flashIndex: 0,
			skeletonNameWidth: `${35 + Math.round(Math.random() * 35)}%`,
		};
	}

	componentDidUpdate(
		prevProps: Readonly<CardTileProps>,
		prevState: Readonly<CardTileState>,
		prevContext: any,
	): void {
		if (
			prevProps.number !== this.props.number ||
			prevProps.disabled !== this.props.disabled
		) {
			this.setState(state => ({ flashIndex: (state.flashIndex + 1) % 100 }));
		}
	}

	renderName() {
		return (
			<CardTileName cardId={this.props.id}>
				{this.props.icon ? <img src={this.props.icon} /> : null}
				{this.props.name !== null ? (
					this.props.name
				) : (
					<SkeletonLine width={this.state.skeletonNameWidth} />
				)}
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
				fontFamily={this.props.fontFamily}
				fontWeight={this.props.fontWeight}
			>
				{this.props.animated ? (
					<FlashOverlay key={this.state.flashIndex} />
				) : null}
				<Darkness disabled={this.props.disabled}>
					{!!this.props.battlegrounds && !!this.props.tier ? (
						<CardTileTier
							src={`https://art.hearthstonejson.com/v1/tiers/${
								this.props.tier
							}.png`}
						/>
					) : (
						<CardTileGem
							rarity={this.props.showRarity ? this.props.rarity : undefined}
						>
							{this.props.cost !== null ? (
								this.props.cost
							) : (
								<SkeletonLine width={"0.75em"} />
							)}
						</CardTileGem>
					)}
					{this.renderName()}
					{this.renderCount()}
				</Darkness>
			</Wrapper>
		);
	}
}

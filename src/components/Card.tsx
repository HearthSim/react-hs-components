import React from "react";
import SkeletonImage from "./SkeletonImage";

// Locale enum
export type HearthstoneLocale =
	| "enUS"
	| "enGB"
	| "frFR"
	| "deDE"
	| "koKR"
	| "esES"
	| "esMX"
	| "ruRU"
	| "zhTW"
	| "zhCN"
	| "itIT"
	| "ptBR"
	| "plPL"
	| "ptPT"
	| "jaJP"
	| "thTH";

export interface CardProps {
	id: string;
	locale?: HearthstoneLocale;
	resolution?: 256 | 512;
	className?: string;
	placeholder?: string;
	battlegrounds?: boolean;
	triple?: boolean;
	style?: React.CSSProperties;
}

export interface CardState {
	loaded?: boolean;
}

export default class Card extends React.Component<CardProps, CardState> {
	constructor(props: CardProps, context: any) {
		super(props, context);
		this.state = {
			loaded: false,
		};
	}

	componentDidUpdate(
		prevProps: Readonly<CardProps>,
		prevState: Readonly<CardState>,
		prevContext: any,
	): void {
		if (prevProps.id !== this.props.id) {
			this.setState({ loaded: false });
		}
	}

	render(): JSX.Element | any | false {
		const prefix = this.props.battlegrounds ? "bgs" : "render";
		const cardId = this.props.id + (this.props.triple ? "_triple" : "");
		const artUrl = `https://art.hearthstonejson.com/v1/${prefix}/latest/${
			this.props.locale || "enUS"
		}/${this.props.resolution || 256}x/${cardId}.png`;
		if (!this.props.placeholder) {
			return (
				<img
					src={artUrl}
					style={this.props.style}
					className={this.props.className}
				/>
			);
		}

		return (
			<SkeletonImage
				src={artUrl}
				placeholderSrc={this.props.placeholder}
				style={this.props.style}
				className={this.props.className}
			/>
		);
	}
}

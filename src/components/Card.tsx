import * as React from "react";
import SkeletonImage from "./SkeletonImage";

export interface CardProps {
	id: string;
	resolution?: 256 | 512;
	className?: string;
	placeholder?: string;
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
		const artUrl = `https://art.hearthstonejson.com/v1/render/latest/enUS/${this
			.props.resolution || 256}x/${this.props.id}.png`;
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

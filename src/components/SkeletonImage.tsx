import React from "react";

export interface SkeletonImageProps
	extends React.ClassAttributes<SkeletonImage> {
	src: string;
	notFoundSrc: string;
	placeholderSrc: string;
	alt?: string;
	className?: string;
	height?: number;
	width?: number;
	style?: React.CSSProperties;
}

export interface SkeletonImageState {
	loaded?: boolean;
	loadError?: boolean;
}

export default class SkeletonImage extends React.Component<
	SkeletonImageProps,
	SkeletonImageState
> {
	constructor(props: SkeletonImageProps, context: any) {
		super(props, context);

		// check whether image is in cache
		const img: HTMLImageElement | null = new Image();
		img.src = this.props.src;
		const inCache = img.complete;

		this.state = {
			loaded: inCache,
			loadError: false,
		};
	}

	render(): JSX.Element | any | false {
		return (
			<img
				src={
					this.state.loadError
						? this.props.notFoundSrc
						: this.state.loaded
						? this.props.src
						: this.props.placeholderSrc
				}
				alt={this.props.alt}
				height={this.props.height}
				width={this.props.width}
				className={this.props.className}
				style={this.props.style}
				onError={() => this.setState({ loadError: true })}
				onLoad={
					!this.state.loaded ? () => this.setState({ loaded: true }) : undefined
				}
			/>
		);
	}
}

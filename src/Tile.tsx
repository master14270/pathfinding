import React from "react";
import { TileTypes } from "./enums";

interface TileProps {
	x: number;
	y: number;
	isMouseDown: boolean;
	selectedTileType: TileTypes;
}

interface TileState {
	type: TileTypes;
}

class Tile extends React.Component<TileProps, TileState> {
	constructor(props: TileProps) {
		super(props);
		this.state = { type: TileTypes.Empty };
	}

	render(): React.ReactNode {
		const tileColor = this.tileColor();
		return (
			<div
				className={`w-[100px] h-[100px] ${tileColor} outline`}
				onMouseOver={(e) => this.mouseOver(e)}
				onClick={(e) => this.updateTileState(e)}
			>
				{/* This is a tile. X: {this.props.x + 1} Y: {this.props.y + 1} */}
			</div>
		);
	}

	// Allows for users to "drag" walls/other objects.
	mouseOver = (e: React.MouseEvent) => {
		if (!this.props.isMouseDown) {
			return;
		}

		this.updateTileState(e);
	};

	updateTileState = (e: React.MouseEvent) => {
		if (this.state.type === this.props.selectedTileType) {
			return;
		}

		this.setState((prevState) => ({
			type: this.props.selectedTileType,
		}));
	};

	tileColor = () => {
		switch (this.state.type) {
			case TileTypes.Empty:
				return "bg-empty";
			case TileTypes.Wall:
				return "bg-wall";
			case TileTypes.Start:
				return "bg-start";
			case TileTypes.End:
				return "bg-end";

			default:
				return "bg-unknown";
		}
	};
}

export default Tile;

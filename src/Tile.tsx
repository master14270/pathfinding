import React from "react";
import { TileTypes } from "./enums";
import { TileData } from "./interfaces";

interface TileProps {
	tileData: TileData;
}

interface TileState {
	temp: number;
}

class Tile extends React.Component<TileProps, TileState> {
	constructor(props: TileProps) {
		super(props);
		this.state = { temp: 0 };
	}

	render(): React.ReactNode {
		const tileColor = this.tileColor();
		return (
			<div className={`w-[100px] h-[100px] ${tileColor} outline`}>
				{/* This is a tile. X: {this.props.x + 1} Y: {this.props.y + 1} */}
			</div>
		);
	}

	tileColor = () => {
		switch (this.props.tileData.type) {
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

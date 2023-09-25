import React from "react";
import Tile from "./Tile";
import { TileTypes } from "./enums";

interface GridProps {
	selectedTileType: TileTypes;
}

interface GridState {
	isMouseDown: boolean;
}

class Grid extends React.Component<GridProps, GridState> {
	constructor(props: GridProps) {
		super(props);
		this.state = { isMouseDown: false };
	}

	render(): React.ReactNode {
		const X_SIZE = 1200;
		const Y_SIZE = 700;

		// See how many tiles can fit in the screen size offered.
		const TILE_SIZE_PX = 100;

		// TODO: Handle rounding errors. For now, just make sure it's even...
		const xTiles = X_SIZE / TILE_SIZE_PX;
		const yTiles = Y_SIZE / TILE_SIZE_PX;

		const tiles = [];
		for (let y = 0; y < yTiles; y++) {
			for (let x = 0; x < xTiles; x++) {
				tiles.push(
					<Tile
						key={`${x}-${y}`}
						x={x}
						y={y}
						isMouseDown={this.state.isMouseDown}
						selectedTileType={this.props.selectedTileType}
					></Tile>
				);
			}
		}

		// Can't make tile width/height dynamic right now with tailwind. Doesn't seem to like variables in the definition.
		return (
			<div
				className={`flex flex-wrap content-start w-[1200px] h-[700px] outline`}
				onMouseDown={(e) => this.mouseDown(e)}
				onMouseUp={(e) => this.mouseUp(e)}
				onMouseLeave={(e) => this.mouseLeave(e)}
			>
				{tiles}
			</div>
		);
	}

	mouseDown = (e: React.MouseEvent) => {
		this.setState((prevState) => ({
			isMouseDown: true,
		}));
	};
	mouseUp = (e: React.MouseEvent) => {
		this.setState((prevState) => ({
			isMouseDown: false,
		}));
	};
	mouseLeave = (e: React.MouseEvent) => {
		this.setState((prevState) => ({
			isMouseDown: false,
		}));
	};
}

export default Grid;

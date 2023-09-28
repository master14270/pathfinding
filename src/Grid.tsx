import React from "react";
import Tile from "./Tile";
import { TileTypes } from "./enums";
import { TileData } from "./interfaces";
import _ from "lodash";

interface GridProps {
	selectedTileType: TileTypes;
}

interface GridState {
	isMouseDown: boolean;
	tiles: Array<Array<TileData>>;
}

class Grid extends React.Component<GridProps, GridState> {
	constructor(props: GridProps) {
		super(props);

		const X_SIZE = 1200;
		const Y_SIZE = 700;

		// See how many tiles can fit in the screen size offered.
		const TILE_SIZE_PX = 100;

		// TODO: Handle rounding errors. For now, just make sure it's even...
		const xTiles = X_SIZE / TILE_SIZE_PX;
		const yTiles = Y_SIZE / TILE_SIZE_PX;

		const tiles = [];

		for (let y = 0; y < yTiles; y++) {
			let tempTiles = [];
			for (let x = 0; x < xTiles; x++) {
				tempTiles.push({
					x: x,
					y: y,
					type: TileTypes.Empty,
				});
			}
			tiles.push(tempTiles);
		}

		this.state = { isMouseDown: false, tiles: tiles };
	}

	render(): React.ReactNode {
		const tiles = [];
		for (let y = 0; y < this.state.tiles.length; y++) {
			for (let x = 0; x < this.state.tiles[y].length; x++) {
				tiles.push(
					<div
						key={`${x}-${y}`}
						onMouseOver={() => this.mouseOver(x, y)}
						onMouseDown={(e) => this.updateTileType(x, y)}
					>
						<Tile tileData={this.state.tiles[y][x]}></Tile>
					</div>
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

	/*
        Allows for users to "drag" tile states across the screen, like a paintbrush.
        We need to pass in the mouse down state because the `React.MouseEvent`
        object does not know about the mouse down state.
    */
	mouseOver = (x: number, y: number) => {
		if (!this.state.isMouseDown) {
			return;
		}

		this.updateTileType(x, y);
	};

	// Clicking does not trigger the `OnMouseOver` event, so this allows the initial tile to be painted.
	updateTileType = (x: number, y: number) => {
		if (this.state.tiles[y][x].type === this.props.selectedTileType) {
			return;
		}

		const newTiles = _.cloneDeep(this.state.tiles);

		// If we are setting the start/end tile, clear others.
		if (this.props.selectedTileType === TileTypes.End) {
			for (let y = 0; y < newTiles.length; y++) {
				for (let x = 0; x < newTiles[y].length; x++) {
					if (newTiles[y][x].type === TileTypes.End) {
						newTiles[y][x].type = TileTypes.Empty;
					}
				}
			}
		} else if (this.props.selectedTileType === TileTypes.Start) {
			for (let y = 0; y < newTiles.length; y++) {
				for (let x = 0; x < newTiles[y].length; x++) {
					if (newTiles[y][x].type === TileTypes.Start) {
						newTiles[y][x].type = TileTypes.Empty;
					}
				}
			}
		}

		newTiles[y][x].type = this.props.selectedTileType;

		this.setGridState(newTiles);
	};

	setGridState = (tiles: Array<Array<TileData>>) => {
		this.setState((prevState) => ({
			tiles: tiles,
		}));
	};
}

export default Grid;

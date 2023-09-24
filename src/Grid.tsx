import React from "react";
import Tile from "./Tile";

function Grid({ xSize = 1200, ySize = 700 }) {
	// See how many tiles can fit in the screen size offered.
	const TILE_SIZE_PX = 100;

	// TODO: Handle rounding errors. For now, just make sure it's even...
	const xTiles = xSize / TILE_SIZE_PX;
	const yTiles = ySize / TILE_SIZE_PX;

	const tiles = [];
	for (let y = 0; y < yTiles; y++) {
		for (let x = 0; x < xTiles; x++) {
			tiles.push(<Tile x={x} y={y}></Tile>);
		}
	}

	// Can't make tile width/height dynamic right now with tailwind. Doesn't seem to like variables in the definition.
	// Will investigate more later.
	// return (
	// 	<div className={`flex flex-wrap content-start h-[${ySize}px] w-[${xSize}px] outline`}>
	// 		{tiles}
	// 	</div>
	// );
	return (
		<div className={`flex flex-wrap content-start w-[1200px] h-[700px] outline`}>{tiles}</div>
	);
}

export default Grid;

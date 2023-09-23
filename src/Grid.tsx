import React from "react";

function Grid({ xTiles = 20, yTiles = 20 }) {
	let tiles = [];
	for (let y = 0; y < yTiles; y++) {
		for (let x = 0; x < xTiles; x++) {
			tiles.push(
				<div className="tile">
					This is a tile. X: {x} Y: {y}
				</div>
			);
		}
	}
	return <div className="tile-container">{tiles}</div>;
}

export default Grid;

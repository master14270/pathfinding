import React from "react";

function Grid({ xTiles = 20, yTiles = 20 }) {
	const tiles = [];
	let toggle = true;
	for (let y = 0; y < yTiles; y++) {
		for (let x = 0; x < xTiles; x++) {
			tiles.push(
				<div className={`h-50 w-50 ${toggle ? "red" : "blue"}`}>
					This is a tile. X: {x + 1} Y: {y + 1}
				</div>
			);
			toggle = !toggle;
		}
	}

	return <div className="">{tiles}</div>;
}

export default Grid;

import React from "react";

interface TileProps {
	x: number;
	y: number;
}

function Tile(props: TileProps) {
	return (
		<div className={`w-[100px] h-[100px] outline`}>
			This is a tile. X: {props.x + 1} Y: {props.y + 1}
		</div>
	);
}

export default Tile;

import React from "react";
import { TileTypes } from "./enums";

interface MenuProps {
	selectedTileType: TileTypes;
	handleChangeType: Function;
}

interface MenuState {}

class Menu extends React.Component<MenuProps, MenuState> {
	render(): React.ReactNode {
		return (
			<div className="m-5">
				{/* Set tile types. */}
				<label className="font-bold">Selected Tile Type</label>
				<div>
					<label className="inline-flex items-center">
						<input
							name="selectedTileType"
							type="radio"
							className="border-gray-300 border-2 text-black focus:border-gray-300 focus:ring-black"
							value={TileTypes.Wall}
							onChange={(e) => this.props.handleChangeType(e)}
							checked={this.props.selectedTileType === TileTypes.Wall}
						/>
						<span className="ml-2">Wall</span>
					</label>
				</div>

				<div>
					<label className="inline-flex items-center">
						<input
							name="selectedTileType"
							type="radio"
							className="border-gray-300 border-2 text-black focus:border-gray-300 focus:ring-black"
							value={TileTypes.Empty}
							onChange={(e) => this.props.handleChangeType(e)}
							checked={this.props.selectedTileType === TileTypes.Empty}
						/>
						<span className="ml-2">Empty</span>
					</label>
				</div>

				<div>
					<label className="inline-flex items-center">
						<input
							name="selectedTileType"
							type="radio"
							className="border-gray-300 border-2 text-black focus:border-gray-300 focus:ring-black"
							value={TileTypes.Start}
							onChange={(e) => this.props.handleChangeType(e)}
							checked={this.props.selectedTileType === TileTypes.Start}
						/>
						<span className="ml-2">Start</span>
					</label>
				</div>

				<div>
					<label className="inline-flex items-center">
						<input
							name="selectedTileType"
							type="radio"
							className="border-gray-300 border-2 text-black focus:border-gray-300 focus:ring-black"
							value={TileTypes.End}
							onChange={(e) => this.props.handleChangeType(e)}
							checked={this.props.selectedTileType === TileTypes.End}
						/>
						<span className="ml-2">End</span>
					</label>
				</div>
			</div>
		);
	}
}

export default Menu;

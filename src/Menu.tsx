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
			<div>
				<label>
					Wall
					<input
						name="selectedTileType"
						type="radio"
						value={TileTypes.Wall}
						onChange={(e) => this.props.handleChangeType(e)}
						checked={this.props.selectedTileType === TileTypes.Wall}
					/>
				</label>
				<label>
					Empty
					<input
						name="selectedTileType"
						type="radio"
						value={TileTypes.Empty}
						onChange={(e) => this.props.handleChangeType(e)}
						checked={this.props.selectedTileType === TileTypes.Empty}
					/>
				</label>
				<label>
					Start
					<input
						name="selectedTileType"
						type="radio"
						value={TileTypes.Start}
						onChange={(e) => this.props.handleChangeType(e)}
						checked={this.props.selectedTileType === TileTypes.Start}
					/>
				</label>
				<label>
					End
					<input
						name="selectedTileType"
						type="radio"
						value={TileTypes.End}
						onChange={(e) => this.props.handleChangeType(e)}
						checked={this.props.selectedTileType === TileTypes.End}
					/>
				</label>
			</div>
		);
	}
}

export default Menu;

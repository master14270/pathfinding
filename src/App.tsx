import React from "react";
import "./css/App.css";
import Grid from "./Grid";
import Menu from "./Menu";
import { TileTypes } from "./enums";

interface AppProps {}

interface AppState {
	selectedTileType: TileTypes;
}

class App extends React.Component<AppProps, AppState> {
	constructor(props: AppProps) {
		super(props);
		this.state = { selectedTileType: TileTypes.Empty };
	}

	render(): React.ReactNode {
		return (
			<div>
				<Grid selectedTileType={this.state.selectedTileType}></Grid>
				<Menu
					selectedTileType={this.state.selectedTileType}
					handleChangeType={this.handleChangeType}
				></Menu>
			</div>
		);
	}

	handleChangeType = (e: React.ChangeEvent<HTMLInputElement>) => {
		const val = parseFloat(e.target.value);
		this.setState((prevState) => ({
			selectedTileType: val,
		}));
	};
}

export default App;

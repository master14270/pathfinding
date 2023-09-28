interface Node {
	x: number;
	y: number;

	parent: any; // not sure how to store this yet...
	gCost: number;
	hCost: number;
	fCost: number;

	isWall: boolean;
	isStart: boolean;
	isEnd: boolean;
	isPath: boolean;
	isOpen: boolean;
	isClosed: boolean;
}

function getDistance(nodeA: Node, nodeB: Node) {
	const xDist = Math.abs(nodeA.x - nodeB.x);
	const yDist = Math.abs(nodeA.y - nodeB.y);

	// TODO: Remove magic numbers.
	const TILE_SIZE_PX = 100;
	const TILE_DIAGONAL_PX = 141.42136; // Roughly.

	if (xDist > yDist) {
		// Travel diagonally the y distance, then travel horizontally the x distance, minus the y distance we already traveled.
		return TILE_DIAGONAL_PX * yDist + TILE_SIZE_PX * (xDist - yDist);
	} else {
		// Vice-Versa..pa
		return TILE_DIAGONAL_PX * xDist + TILE_SIZE_PX * (yDist - xDist);
	}
}

// Return array of nodes, being the shortest path found.
function retracePath(nodeStart: Node, nodeEnd: Node) {
	const res: Node[] = [];
	return res;
}

function areNodesEqual(nodeA: Node, nodeB: Node) {
	return nodeA.x === nodeB.x && nodeA.y === nodeB.y;
}

function getLegalNeighbors(node: Node, xSize: number, ySize: number) {
	const result = [];

	for (let y = -1; y < 2; y++) {
		for (let x = -1; x < 2; x++) {
			// The node itself is not a neighbor.
			if (y === 0 && x === 0) {
				continue;
			}

			if (y + node.y < 0 || x + node.x < 0) {
				continue;
			}

			if (y + node.y > ySize || x + node.x > xSize) {
				continue;
			}

			result.push({
				x: x,
				y: y,
			});
		}
	}

	return result;
}

// A* Pathfinding Algorithm
function findPath(nodeStart: Node, nodeEnd: Node, nodes: Array<Array<Node>>) {
	// Initialize some costs.
	nodeStart.gCost = 0;
	nodeStart.hCost = getDistance(nodeStart, nodeEnd);
	nodeStart.fCost = nodeStart.gCost + nodeStart.hCost;

	// Track open/closed nodes, then start with the open node.
	const openNodes: Node[] = [];
	const closedNodes: Node[] = [];
	openNodes.push(nodeStart);

	// While there are still traversible nodes
	while (openNodes.length) {
		// Get the node with the lowest fCost, or the lower hCost if fCost is equal.
		let currentNode = openNodes[0];
		let currentNodeIndex = 0;
		for (let i = 0; i < openNodes.length; i++) {
			const node = openNodes[i];
			if (
				node.fCost < currentNode.fCost ||
				(node.fCost === currentNode.fCost && node.hCost < currentNode.hCost)
			) {
				currentNode = node;
				currentNodeIndex = i;
			}
		}

		// Now that we have the node to calculate, add it to the closed nodes, and remove it from open.
		openNodes.splice(currentNodeIndex, 1);
		closedNodes.push(currentNode);

		// Update display data
		currentNode.isClosed = true;
		currentNode.isOpen = false;

		// TODO: Call some function that updates the screen?

		// If we have found the path, stop here.
		if (areNodesEqual(currentNode, nodeEnd)) {
			const path = retracePath(currentNode, nodeEnd);
			for (let i = 0; i < path.length; i++) {
				path[i].isPath = true;
				// TODO: Call some function that updates the screen?
			}
			return true;
		}

		// Otherwise, calculate all posible neighbors.
		const neigborIndecies = getLegalNeighbors(currentNode, nodes[0].length, nodes.length);

		// For each
		for (let i = 0; i < neigborIndecies.length; i++) {
			const neighbor = nodes[neigborIndecies[i].y][neigborIndecies[i].x];
			if (neighbor.isWall) {
				continue;
			}

			const inClosedNodes = closedNodes.some(function (node) {
				return areNodesEqual(node, neighbor);
			});
			if (inClosedNodes) {
				continue;
			}

			const newMoveCostToNeighbor = currentNode.gCost + getDistance(currentNode, neighbor);
			const inOpenNodes = openNodes.some(function (node) {
				return areNodesEqual(node, neighbor);
			});
			if (newMoveCostToNeighbor < neighbor.gCost || !inOpenNodes) {
				neighbor.gCost = newMoveCostToNeighbor;
				neighbor.hCost = getDistance(neighbor, nodeEnd);
				neighbor.fCost = neighbor.gCost + neighbor.hCost;
				neighbor.parent = { x: currentNode.x, y: currentNode.y };

				if (!inOpenNodes) {
					openNodes.push(neighbor);
					neighbor.isOpen = true;
					// TODO: Call some function that updates the screen?
				}
			}
		}
	}

	// No path...
	return false;
}

export {};

import { Vector2 } from '../vector2.js';
import { Map } from '../mapManager.js';
import { PathNode } from './pathNode.js';

const CreateNodes = (a_iWidth, a_iHeight, a_oaTiles) => {
	const grid = [];
	for(let i = 0; i < a_iWidth; ++i) {
		grid[i] = [];
		for(let j = 0; j < a_iHeight; ++j) {
			grid[i][j] = new PathNode(a_oaTiles[j][i]);
		}
	}

	for(let i = 0; i < a_iWidth - 1; ++i) {
		for(let j = 0; j < a_iHeight - 1; ++j) {
			if (grid[i][j].pathable === false) {
				continue;
			}

			const bNorth = grid[i][j+1].pathable;
			const bEast = grid[i+1][j].pathable;
			const bNorthEast = bNorth && bEast && grid[i+1][j+1].pathable;

			const bWest = i > 0 && grid[i-1][j].pathable;
			const bNorthWest = bWest && bNorth && grid[i-1][j+1];

			if(bNorth) {
				grid[i][j].connections.N = grid[i][j+1];
				grid[i][j+1].connections.S = grid[i][j];
			}
			if(bEast) {
				grid[i][j].connections.E = grid[i+1][j];
				grid[i+1][j].connections.W = grid[i][j];
			}
			if(bNorthEast) {
				grid[i][j].connections.NE = grid[i+1][j+1];
				grid[i+1][j+1].connections.SW = grid[i][j];
			}
			if(bNorthWest) {
				grid[i][j].connections.NW = grid[i-1][j+1];
				grid[i-1][j+1].connections.SE = grid[i][j];
			}
		}
	}
	return grid;
};

const UnlinkNodes = (a_oFirst, a_oSecond) => {
	for (let key of Object.keys(a_oFirst.connections)) {
		if(a_oFirst.connections[key] === a_oSecond) {
			a_oFirst.connections[key] = null;
			break;
		}
	}
	
	for (let key of Object.keys(a_oSecond.connections)) {
		if(a_oSecond.connections[key] === a_oFirst) {
			a_oSecond.connections[key] = null;
			break;
		}
	}
};

const AStar= (a_StartNode, a_EndNode) => {
	const path = [];
	path.push(a_StartNode);

	const vNorthWest = new Vector2(-1, 1);
	const vNorth = new Vector2(0, 1);
	const vNorthEast = new Vector2(1, 1);
	const vWest = new Vector2(-1, 0);
	const vEast = new Vector2(1, 0);
	const vSouthWest = new Vector2(-1, -1);
	const vSouth = new Vector2(0, -1);
	const vSouthEast = new Vector2(1, -1);

	while(path[path.length - 1] !== a_EndNode && path.length > 0) {
		const currentNode = path[path.length - 1];

		const direction = a_EndNode.position.Subtract(currentNode.position);
		
		const directions = [
			{
				target: 'NW',
				distance: direction.Subtract(vNorthWest).DistanceSquared()
			}, {
				target: 'N',
				distance: direction.Subtract(vNorth).DistanceSquared()
			}, {
				target: 'NE',
				distance: direction.Subtract(vNorthEast).DistanceSquared()
			}, {
				target: 'W',
				distance: direction.Subtract(vWest).DistanceSquared()
			}, {
				target: 'E',
				distance: direction.Subtract(vEast).DistanceSquared()
			}, {
				target: 'SW',
				distance: direction.Subtract(vSouthWest).DistanceSquared()
			}, {
				target: 'S',
				distance: direction.Subtract(vSouth).DistanceSquared()
			}, {
				target: 'SE',
				distance: direction.Subtract(vSouthEast).DistanceSquared()
			}
		];
		directions.sort((a,b) => { return a.distance < b.distance ? -1 : 1; } );
		// the shortest distance from the above list should be the closest to the target
		// it should now be highest priority direction first

		let found = false;

		for (let i = 0; i < directions.length; ++i) {
			const nextNode = currentNode.connections[directions[i].target];
			if (nextNode !== null) {
				UnlinkNodes(currentNode, nextNode);

				path.push(nextNode);
				found = true;
				break;
			}
		}
		if(found) {
			continue;
		}
		path.pop();
	}

	return path.map((node) => { return node.position; });
};

export class Pathfinder {
	constructor(a_vStart, a_vEnd, a_bHuman) {
		this.vStart = a_vStart;
		this.vEnd = a_vEnd;
		this.bHuman = a_bHuman;
	}
	GetPath() {
		const mapManager = new Map();

		const zombiePathRadius = 5;

		const vTopLeft = this.bHuman ? new Vector2(0, mapManager.MapHeight) : new Vector2(this.vStart.X - zombiePathRadius, this.vStart.Y + zombiePathRadius);
		const vBottomRight = this.bHuman ? new Vector2(mapManager.MapWidth, 0) : new Vector2(this.vStart.X + zombiePathRadius, this.vStart.Y - zombiePathRadius);

		const tiles = mapManager.GetTileRange(vTopLeft, vBottomRight);
		const gridWidth = tiles[0].length;
		const gridHeight = tiles.length;

		const nodes = CreateNodes(gridWidth, gridHeight, tiles);
		const vBottomLeftNode = nodes[0][0].position;
		const vTopRightNode = nodes[gridWidth-1][gridHeight-1].position;
		const vTargetNodePosition = Vector2.Clamp(this.vEnd, vBottomLeftNode, vTopRightNode);
		const vStartNodePosition = Vector2.Clamp(this.vStart, vBottomLeftNode ,vTopRightNode);
		
		const vStartNodeIndex = vStartNodePosition.Subtract(vBottomLeftNode);
		const vEndNodeIndex = vTargetNodePosition.Subtract(vBottomLeftNode);

		const oStartNode = nodes[vStartNodeIndex.X][vStartNodeIndex.Y];
		const oEndNode = nodes[vEndNodeIndex.X][vEndNodeIndex.Y];

		return AStar(oStartNode, oEndNode);
	}
}
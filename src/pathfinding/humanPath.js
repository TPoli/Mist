import { Vector2 } from '../vector2.js';
import { Map } from '../mapManager.js';
import { PathNode } from './pathNode.js';
import { vNorthWest, vNorth, vNorthEast, vWest, vEast, vSouthEast, vSouth } from './pathfinding.js';

export class HumanPathfinder {
	constructor(a_vStart, a_vEnd) {
		this.vStart = a_vStart;
		this.vEnd = a_vEnd;
	}
	GetPath() {
		const mapManager = new Map();

		const vTopLeft = new Vector2(0, mapManager.MapHeight);
		const vBottomRight = new Vector2(mapManager.MapWidth, 0);

		const tiles = mapManager.GetTileRange(vTopLeft, vBottomRight);
		const gridWidth = mapManager.MapWidth;
		const gridHeight = mapManager.MapHeight;

		const nodes = this.CreateNodes(gridWidth, gridHeight, tiles);
		const vBottomLeftNode = nodes[0][0].position;
		const vTopRightNode = nodes[gridWidth-1][gridHeight-1].position;
		const vTargetNodePosition = Vector2.Clamp(this.vEnd, vBottomLeftNode, vTopRightNode);
		const vStartNodePosition = Vector2.Clamp(this.vStart, vBottomLeftNode ,vTopRightNode);
		
		const vStartNodeIndex = vStartNodePosition.Subtract(vBottomLeftNode);
		const vEndNodeIndex = vTargetNodePosition.Subtract(vBottomLeftNode);

		const oStartNode = nodes[vStartNodeIndex.X][vStartNodeIndex.Y];
		const oEndNode = nodes[vEndNodeIndex.X][vEndNodeIndex.Y];

		return this.AStar(oStartNode, oEndNode);
	}

	CreateNodes(a_iWidth, a_iHeight, a_oaTiles) {
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
	}
	AStar(a_StartNode, a_EndNode) {
		const path = [];
		path.push(a_StartNode);
	
		
	
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
					distance: direction.Subtract(vSouthEast).DistanceSquared()
				}, {
					target: 'S',
					distance: direction.Subtract(vSouth).DistanceSquared()
				}, {
					target: 'SE',
					distance: direction.Subtract(vSouthEast).DistanceSquared()
				}
			];
			directions.sort((a,b) => { return a.distance < b.distance ? -1 : 1; } );
	
			let found = false;
	
			for (let i = 0; i < directions.length; ++i) {
				const nextNode = currentNode.connections[directions[i].target];
				if (nextNode !== null) {
					currentNode.Unlink(nextNode);
	
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
	}
}
import { Vector2 } from '../vector2.js';
import { PathNode } from './pathNode.js';

export const vNorthWest = new Vector2(-1, 1);
export const vNorth = new Vector2(0, 1);
export const vNorthEast = new Vector2(1, 1);
export const vWest = new Vector2(-1, 0);
export const vEast = new Vector2(1, 0);
export const vSouthWest = new Vector2(-1, -1);
export const vSouth = new Vector2(0, -1);
export const vSouthEast = new Vector2(1, -1);

export class Pathfinder {
	constructor(a_vStart, a_vEnd) {
		this.vStart = a_vStart;
		this.vEnd = a_vEnd;
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
}
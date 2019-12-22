import { Vector2 } from '../vector2.js';
import { Map } from '../mapManager.js';
import { Pathfinder, vNorthWest, vNorth, vNorthEast, vWest, vEast,
	vSouthWest, vSouth, vSouthEast } from './pathfinding.js';

export class ZombiePathfinder extends Pathfinder{
	GetPath() {
		const mapManager = new Map();

		const zombiePathRadius = 5;

		const vTopLeft = this.vStart.Add(new Vector2(-zombiePathRadius, zombiePathRadius));
		const vBottomRight = this.vStart.Add(new Vector2(zombiePathRadius, -zombiePathRadius));

		const tiles = mapManager.GetTileRange(vTopLeft, vBottomRight);
		const gridWidth = tiles[0].length;
		const gridHeight = tiles.length;

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
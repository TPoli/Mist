import { Tile } from './tile.js';

export const g_iMapWidth = 20;
export const g_iMapHeight = 20;

export class Map {
	
	constructor(seed) {

		this._tiles = [];

		for (let i = 0; i < g_iMapHeight; ++i) {
			const row = [];
			for (let j = 0; j < g_iMapWidth; ++j) {
				const rand = Math.floor(Math.random() * 10);
				if ((rand) < 8) {
					row[j] = Tile.CreateRoad(j,i);
				} else {
					row[j] = Tile.CreateWall(j, i);
				}
			}
			this._tiles[i] = row;
		}
	}
	Render() {
		//return this.present() + ', it is a ' + this.model;
		for(let i = 0; i < this._tiles.length; ++i) {
			for(let j = 0; j < this._tiles[i].length; ++j) {
				this._tiles[i][j].Render();
			}
		}
	}
	get tiles() {
		return this._tiles;
	}
	//set carname(x) {
	//	this._carname = x;
	//}
}
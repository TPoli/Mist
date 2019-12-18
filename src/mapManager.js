import { Tile } from './tile.js';
import { SeedRandom, RandomNext } from './prng.js';

let instance = null;

export class Map {
	
	constructor(seed) {
		if(instance !== null) {
			return instance;
		}
		instance = this;
		SeedRandom(seed);
		this._tiles = [];

		this._MapWidth = RandomNext() % 20 + 20;
		this._MapHeight = RandomNext() % 20 + 20;

		for (let i = 0; i < this.MapHeight; ++i) {
			const row = [];
			for (let j = 0; j < this.MapWidth; ++j) {
				if (i % 3 === 0 || j % 3 === 0) {
					row[j] = Tile.CreateRoad(j,i);
				} else {
					row[j] = Tile.CreateWall(j, i);
				}
			}
			this._tiles[i] = row;
		}
		return instance;
	}
	Render() {
		for(let i = 0; i < this._tiles.length; ++i) {
			for(let j = 0; j < this._tiles[i].length; ++j) {
				this._tiles[i][j].Render();
			}
		}
	}
	get tiles() {
		return this._tiles;
	}
	get MapWidth() {
		return this._MapWidth;
	}
	get MapHeight() {
		return this._MapHeight;
	}
	GetTileXY(a_iX, a_iY) {
		return this.tiles[a_iY][a_iX];
	}
	GetTileV2(a_vPosition) {
		return this.GetTileXY(Math.floor(a_vPosition.Y), Math.floor(a_vPosition.X));
	}
	GetTileRange(a_vTopLeft, a_vBotRight) {
		const section = [];

		const startY = Math.max(a_vBotRight.Y,0);
		const endY = Math.min(a_vTopLeft.Y + 1, this.MapHeight);
		const startX = Math.max(a_vTopLeft.X,0);
		const endX = Math.min(a_vBotRight.X + 1, this.MapWidth);

		for(let i = startY; i < endY; ++i) {
			section.push(this.tiles[i].slice(startX,endX));
		}

		return section;
	}
}
import { Renderable } from './renderable.js';
import { DefaultShader } from './shader.js';
import { Map } from './mapManager.js';
import { Vector2 } from './vector2.js';

export class Entity extends Renderable {
	
	constructor(a_iX, a_iY, a_oTexture, a_oColour) {
		super(a_iX, a_iY, DefaultShader(), a_oTexture, a_oColour);
	}
	GetTile() {
		const mapManager = new Map();
		const vTileIndex = this.position.ToPoint(new Vector2(0.5,0.5));
		return mapManager.GetTileXY(vTileIndex.X, vTileIndex.Y);
	}
}
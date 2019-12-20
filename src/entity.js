import { Renderable } from './renderable.js';
import { DefaultShader } from './shader.js';
import { Map } from './mapManager.js';
import { Vector2 } from './vector2.js';

export class Entity extends Renderable {
	
	constructor(a_iX, a_iY, a_oTexture, a_oColour) {
		super(a_iX, a_iY, DefaultShader(), a_oTexture, a_oColour);
		// eslint-disable-next-line no-magic-numbers
		this.center = new Vector2(0.5,0.5);
	}
	GetTile() {
		return new Map().GetTileV2(this.GetTileIndex());
	}
	GetTileIndex() {
		return this.position.ToPoint(this.center);
	}
}
import { Renderable } from './renderable.js';
import { TileShader } from './shader.js';
import { GetTexture } from './textureManager.js';

export class Tile extends Renderable {
	
	constructor(a_iX, a_iY, a_oTexture, a_oColour) {
		super(a_iX, a_iY, TileShader(), a_oTexture, a_oColour);
	}

	static CreateRoad(a_iX, a_iY) {
		return new Tile(a_iX, a_iY, GetTexture('road.png'));
	}

	static CreateWall(a_iX, a_iY) {
		return new Tile(a_iX, a_iY, GetTexture('f-texture.png'));
	}
}
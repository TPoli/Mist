import { Renderable } from './renderable.js';
import { TileShader } from './shader.js';

export class Tile extends Renderable {
	
	constructor(a_iX, a_iY, a_oTexture, a_oColour) {
		super(a_iX, a_iY, TileShader(), a_oTexture, a_oColour);
	}
}
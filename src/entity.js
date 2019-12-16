import { Renderable } from './renderable.js';
import { DefaultShader } from './shader.js';

export class Entity extends Renderable {
	
	constructor(a_iX, a_iY, a_oTexture, a_oColour) {
		super(a_iX, a_iY, DefaultShader(), a_oTexture, a_oColour);
	}
}
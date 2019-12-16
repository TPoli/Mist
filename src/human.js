import { GetTexture } from './textureManager.js';
import { Entity } from './entity.js';

export class Human extends Entity {
	
	constructor(a_iX, a_iY) {
		super(a_iX, a_iY, GetTexture('blip.png'), [0,1,0,1]);
	}

	Update() {
		
	}

}
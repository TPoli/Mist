import { GetTexture } from './textureManager.js';
import { Entity } from './entity.js';

export class Zombie extends Entity {
	
	constructor(a_iX, a_iY) {
		super(a_iX, a_iY, GetTexture('blip.png'), [1,0,0,1]);
	}
}
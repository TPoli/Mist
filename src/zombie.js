import { GetTexture } from './textureManager.js';
import { Entity } from './entity.js';
import { EntityManager } from './entityManager.js';
import { Vector2 } from './vector2.js';
import { Map } from './mapManager.js';

export class Zombie extends Entity {
	
	constructor(a_iX, a_iY) {
		super(a_iX, a_iY, GetTexture('blip.png'), [1,0,0,1]);
	}

	Update(deltaTime) {
		const entityManager = new EntityManager();
		const targetHuman = entityManager.humans[0];

		const mapManager = new Map();
		const humanTile = mapManager.GetTileV2(targetHuman.position);

		if(humanTile.pathable) {
			const zombieDirection = new Vector2(targetHuman.position.X - this.position.X, targetHuman.position.Y - this.position.Y);
			zombieDirection.Normalize();
	
			const terminatorSpeed = 2.5;

			this.position.X += zombieDirection.X * deltaTime * terminatorSpeed;
			this.position.Y += zombieDirection.Y * deltaTime * terminatorSpeed;
		}
		
	}
}
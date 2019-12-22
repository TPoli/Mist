import { GetTexture } from './textureManager.js';
import { Entity } from './entity.js';
import { EntityManager } from './entityManager.js';
import { ZombiePathfinder } from './pathfinding/zombiePath.js';

export class Zombie extends Entity {
	
	constructor(a_iX, a_iY) {
		super(a_iX, a_iY, GetTexture('blip.png'), [1,0,0,1]);
		this.vaPathToHuman = [];
	}

	Update(deltaTime) {
		const entityManager = new EntityManager();
		const targetHuman = entityManager.humans[0];

		if(this.vaPathToHuman.length === 0 && targetHuman.GetTile().pathable) {
			const vTargetTileIndex = targetHuman.GetTileIndex();
			const pathFinder = new ZombiePathfinder(this.GetTileIndex(), vTargetTileIndex);
			this.vaPathToHuman = pathFinder.GetPath();
		}

		if(this.vaPathToHuman.length > 0) {
			const zombieDirection = this.vaPathToHuman[0].Subtract(this.position);
			const distanceSquared = zombieDirection.DistanceSquared();
			const zombieSpeed = 2.5;
			
			if(Math.sqrt(distanceSquared) < zombieSpeed * deltaTime) {
				this.position = this.vaPathToHuman[0];
				this.vaPathToHuman = this.vaPathToHuman.slice(1);
			} else {
				zombieDirection.Normalize();
				this.position.X += zombieDirection.X * deltaTime * zombieSpeed;
				this.position.Y += zombieDirection.Y * deltaTime * zombieSpeed;
			}
		}
	}
}
import { GetTexture } from './textureManager.js';
import { Entity } from './entity.js';
import { EntityManager } from './entityManager.js';
import { Pathfinder } from './pathfinding/pathfinding.js';

export class Zombie extends Entity {
	
	constructor(a_iX, a_iY) {
		super(a_iX, a_iY, GetTexture('blip.png'), [1,0,0,1]);
		this.vaPathToHuman = [];
	}

	Update(deltaTime) {
		const entityManager = new EntityManager();
		const targetHuman = entityManager.humans[0];

		if(this.vaPathToHuman.length === 0) {
			const humanTile = targetHuman.GetTile();

			if(humanTile.pathable) {
				const pathFinder = new Pathfinder(this.GetTileIndex(), targetHuman.GetTileIndex());
				this.vaPathToHuman = pathFinder.GetPath();
			}
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
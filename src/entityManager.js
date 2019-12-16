import { Human } from './human.js';
import { InputManager } from './inputManager.js';
import { Vector2 } from './vector2.js';
import { Zombie } from './zombie.js';

var entitymanager = null;

var human = new Human(0, 0);
var zombie = new Zombie(0, 0);

export class EntityManager {
	constructor(seed) {

	}
	static Instance(seed) {
		if(entitymanager === null) {
			entitymanager = new EntityManager(seed);
		}
		return EntityManager;
	}

	Update(deltaTime) {
		if(InputManager().keys.up == 1) {
			human.position.Y += deltaTime;
		}
		if(InputManager().keys.down == 1) {
			human.position.Y -= deltaTime;
		}
		if(InputManager().keys.left == 1) {
			human.position.X -= deltaTime;
		}
		if(InputManager().keys.right == 1) {
			human.position.X += deltaTime;
		}

		const zombieDirection = new Vector2(human.position.X - zombie.position.X, human.position.Y - zombie.position.Y);
		zombieDirection.Normalize();
	
		const terminatorSpeed = 0.5;

		zombie.position.X += zombieDirection.X * deltaTime * terminatorSpeed;
		zombie.position.Y += zombieDirection.Y * deltaTime * terminatorSpeed;
	}

	Render(){
		human.Render();
		zombie.Render();
	}
}
import { Human } from './human.js';
import { InputManager } from './inputManager.js';
import { Zombie } from './zombie.js';

var instance = null;

export class EntityManager {
	constructor(seed) {
		if(instance) {
			return instance;
		}
		instance = this;
		this.humans = [];
		this.zombies = [];

		this.humans.push(new Human(0, 0));
		this.zombies.push(new Zombie(0, 0));

		return instance;
	}

	Update(deltaTime) {
		if(InputManager().keys.up == 1) {
			this.humans[0].position.Y += deltaTime * 5;
		}
		if(InputManager().keys.down == 1) {
			this.humans[0].position.Y -= deltaTime * 5;
		}
		if(InputManager().keys.left == 1) {
			this.humans[0].position.X -= deltaTime * 5;
		}
		if(InputManager().keys.right == 1) {
			this.humans[0].position.X += deltaTime * 5;
		}

		for(let i = 0; i < this.zombies.length; ++i) {
			this.zombies[i].Update(deltaTime);
		}
	}

	Render(){
		for(let i = 0; i < this.humans.length; ++i) {
			this.humans[i].Render();
		}
		for(let i = 0; i < this.zombies.length; ++i) {
			this.zombies[i].Render();
		}
	}
}
import { Human } from './human.js';
import { InputManager } from './inputManager.js';
import { Zombie } from './zombie.js';
import { SeedRandom } from './prng.js';

var instance = null;

export class EntityManager {
	constructor(seed) {
		if(instance) {
			return instance;
		}
		instance = this;
		SeedRandom(seed);
		//let r = RandomNext();
		this.humans = [];
		this.zombies = [];

		this.humans.push(new Human(0, 0));
		this.zombies.push(new Zombie(0, 0));

		return instance;
	}

	Update(deltaTime) {
		const humanSpeed = 5;
		if(InputManager().keys.up.keyState === 1) {
			this.humans[0].position.Y += deltaTime * humanSpeed;
		}
		if(InputManager().keys.down.keyState === 1) {
			this.humans[0].position.Y -= deltaTime * humanSpeed;
		}
		if(InputManager().keys.left.keyState === 1) {
			this.humans[0].position.X -= deltaTime * humanSpeed;
		}
		if(InputManager().keys.right.keyState === 1) {
			this.humans[0].position.X += deltaTime * humanSpeed;
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
import { Button } from './button.js';
import { Vector2 } from '../vector2.js';
import { CanvasManager } from '../canvasManager.js';

const BarricadeCallback = () => {
	console.log('barricade clicked');
};

const CacheCallback = () => {
	console.log('cache clicked');
};

const DepotCallback = () => {
	console.log('depot clicked');
};

const WallCallback = () => {
	console.log('wall clicked');
};

const PostCallback = () => {
	console.log('post clicked');
};

const TowerCallback = () => {
	console.log('tower clicked');
};

export class Toolbox {
	constructor() {
		this.buttons = [];
		this.width = 350;
		this.height = 200;
		
		this.buttons.push(new Button('Barricade', new Vector2(0, 0), BarricadeCallback));
		this.buttons.push(new Button('Cache', new Vector2(0, 0), CacheCallback));
		this.buttons.push(new Button('Depot', new Vector2(0, 0), DepotCallback));
		this.buttons.push(new Button('Wall', new Vector2(0, 0), WallCallback));
		this.buttons.push(new Button('Post', new Vector2(0, 0), PostCallback));
		this.buttons.push(new Button('Tower', new Vector2(0, 0), TowerCallback));
		
		let widest = 0;
		for (let i = 0; i < this.buttons.length; ++i) {
			// eslint-disable-next-line no-magic-numbers
			let buttonWidth = this.buttons[i].hPadding * 2;
			buttonWidth += this.buttons[i].textDimensions.X;
			// eslint-disable-next-line no-magic-numbers
			buttonWidth += this.buttons[i].radius * 2;
			if(buttonWidth > widest) {
				widest = buttonWidth;
			}
		}

		const marginX = 20;
		const marginY = 20;
		const paddingY = 50;
		const paddingX = 10;
		let x = marginX;
		let y = marginY;
		for (let i = 0; i < this.buttons.length; ++i) {
			this.buttons[i].SetPosition(new Vector2(x, y));
			x += widest + paddingX;
			if(x + widest > this.width) {
				y += paddingY;
				x = marginX;
			}
			this.buttons[i].SetBounds();
		}

	}
	Update() {
		for (let i = 0; i < this.buttons.length; ++i) {
			if(this.buttons[i].Clicked()) {
				this.buttons[i].callback();
			}
		}
	}
	Render() {
		const canvasManager = new CanvasManager();
		var uiCanvas =canvasManager.uiCanvas;
		const ctx = uiCanvas.getContext('2d');
		const bottom = uiCanvas.clientHeight;
		
		ctx.clearRect(0,0, uiCanvas.clientWidth, uiCanvas.clientHeight);
	
		ctx.fillStyle = '#000000';
		ctx.strokeStyle = '#FFFFFF';
		ctx.fillRect(0, bottom - this.height, this.width, this.height);
		ctx.strokeRect(0, bottom - this.height, this.width, this.height);

		for (let i = 0; i < this.buttons.length; ++i) {
			this.buttons[i].Render();
		}
	}
}
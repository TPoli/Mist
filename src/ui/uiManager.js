import { Button } from './button.js';
import { Vector2 } from '../vector2.js';

var m_Instance = null;

var uiCanvas = document.getElementById('uiCanvas');
var ctx = uiCanvas.getContext('2d');
const bottom = uiCanvas.clientHeight;

const BarricadeCallback = () => {
	console.log('barricade clicked');
};

const CacheCallback = () => {
	console.log('cache clicked');
};

const WarehouseCallback = () => {
	console.log('warehouse clicked');
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

export class UIManager{
	constructor() {

		if(m_Instance !== null) {
			return m_Instance;
		}
		m_Instance = this;

		this.buttons = [];
		
		this.buttons.push(new Button('Barricade', new Vector2(20, 20), BarricadeCallback));
		this.buttons.push(new Button('Cache', new Vector2(100, 20), CacheCallback));
		this.buttons.push(new Button('Warehouse', new Vector2(180, 20), WarehouseCallback));
		this.buttons.push(new Button('Wall', new Vector2(20, 120), WallCallback));
		this.buttons.push(new Button('Post', new Vector2(100, 120), PostCallback));
		this.buttons.push(new Button('Tower', new Vector2(180, 120), TowerCallback));
	}
	RenderText(a_fX, a_fY, a_sText) {
		ctx.font = '30px Arial';
		ctx.fillStyle = 'red';
		ctx.textAlign = 'center';
		ctx.fillText(a_sText, a_fX, a_fY);
	}
	Render() {
		const toolboxWidth = 300;
		const toolboxHeight = 200;
		ctx.clearRect(0,0, uiCanvas.clientWidth, uiCanvas.clientHeight);
	
		ctx.fillStyle = '#000000';
		ctx.fillRect(0, bottom - toolboxHeight, toolboxWidth, toolboxHeight);

		for (let i = 0; i < this.buttons.length; ++i) {
			this.buttons[i].Render();
		}
	}
	
	Update() {
		for (let i = 0; i < this.buttons.length; ++i) {
			if(this.buttons[i].Clicked()) {
				this.buttons[i].callback();
			}
		}
	}
}








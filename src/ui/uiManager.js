import { Button } from './button.js';
import { Vector2 } from '../vector2.js';

var uiCanvas = document.getElementById('uiCanvas');
var ctx = uiCanvas.getContext('2d');
const bottom = uiCanvas.clientHeight;

const barricadeButton = new Button('Barricade', new Vector2(20, 20));
const cacheButton = new Button('Cache', new Vector2(100, 20));
const warehouseButton = new Button('Warehouse', new Vector2(180, 20));

const wallButton = new Button('Wall', new Vector2(20, 120));
const postButton = new Button('Post', new Vector2(100, 120));
const towerButton = new Button('Tower', new Vector2(180, 120));

export const RenderText = (a_fX, a_fY, a_sText) => {
	ctx.font = '30px Arial';
	ctx.fillStyle = 'red';
	ctx.textAlign = 'center';
	ctx.fillText(a_sText, a_fX, a_fY);
};

export const RenderUI = () => {
	const toolboxWidth = 300;
	const toolboxHeight = 200;
	ctx.clearRect(0,0, uiCanvas.clientWidth, uiCanvas.clientHeight);

	ctx.fillStyle = '#000000';
	ctx.fillRect(0, bottom - toolboxHeight, toolboxWidth, toolboxHeight);

	barricadeButton.Render();
	cacheButton.Render();
	warehouseButton.Render();
	wallButton.Render();
	postButton.Render();
	towerButton.Render();
	
};
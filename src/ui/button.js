import { Vector2 } from '../vector2.js';

import { CanvasManager } from '../canvasManager.js';

export class Button {
	constructor(a_sText, a_vPosition, a_font = '15px Arial') {
		const canvasManager = new CanvasManager();

		const bottom = canvasManager.uiCanvas.clientHeight;
		this.vPosition = new Vector2(a_vPosition.X, bottom - a_vPosition.Y);
		this.font = a_font;
		this.text = a_sText;
	}
	Render() {
		const canvasManager = new CanvasManager();
		const ctx = canvasManager.uiCanvas.getContext('2d');

		ctx.font = this.font;
		ctx.fillStyle = 'red';
		ctx.textAlign = 'left';
		ctx.fillText(this.text, this.vPosition.X, this.vPosition.Y);
	}
}
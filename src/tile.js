import { Renderable } from './renderable.js';
import { TileShader } from './shader.js';
import { GetTexture } from './textureManager.js';
import { CanvasManager } from './canvasManager.js';
import { g_iSpriteSize } from './globalConstants.js';
import { Line } from './line.js';
import { Vector2 } from './vector2.js';

export class Tile extends Renderable {
	
	constructor(a_iX, a_iY, a_oTexture, a_bPathable) {
		super(a_iX, a_iY, TileShader(), a_oTexture);
		this.pathable = a_bPathable;
	}

	static CreateRoad(a_iX, a_iY) {
		return new Tile(a_iX, a_iY, GetTexture('road.png'), true);
	}

	static CreateWall(a_iX, a_iY) {
		return new Tile(a_iX, a_iY, GetTexture('f-texture.png'), false);
	}

	GetBoundingBox() {
		const canvasManager = new CanvasManager();
		const halfStepX = g_iSpriteSize / canvasManager.glCanvas.offsetWidth;
		const halfStepY = g_iSpriteSize / canvasManager.glCanvas.offsetWidth;
		return [
			new Line(this.position.Add(new Vector2(-halfStepX, -halfStepY), new Vector2(halfStepX, -halfStepY))),
			new Line(this.position.Add(new Vector2(-halfStepX, halfStepY), new Vector2(halfStepX, halfStepY))),
			new Line(this.position.Add(new Vector2(-halfStepX, -halfStepY), new Vector2(-halfStepX, halfStepY))),
			new Line(this.position.Add(new Vector2(halfStepX, -halfStepY), new Vector2(halfStepX, halfStepY)))
		];
	}
}
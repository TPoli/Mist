import { g_AllShaders } from './shader.js';
import { InputManager } from './inputManager.js';
import { RenderUI } from './uiManager.js';
import { CreateMesh } from './mesh.js';
import { CanvasManager } from './canvasManager.js';
import { g_iMapHeight, Map } from './mapManager.js';
import { Vector2 } from './vector2.js';
import { EntityManager } from './entityManager.js';

const seed = 1;

const entityManager = new EntityManager(seed);
const canvasManager = CanvasManager.Instance(seed);

const g_iSpriteSize = 64; // in pixels

const g_oMap = new Map(1);

const cameraPos = new Vector2(0,0);

const Update = (deltaTime) => {

	if(InputManager().keys.a == 1) {
		cameraPos.X -= deltaTime;
	}
	if(InputManager().keys.d == 1) {
		cameraPos.X += deltaTime;
	}
	if(InputManager().keys.w == 1) {
		cameraPos.Y += deltaTime * 3;
	}
	if(InputManager().keys.s == 1) {
		cameraPos.Y -= deltaTime * 3;
	}

	entityManager.Update(deltaTime);

	cameraPos.X = Math.min(1, cameraPos.X);
	cameraPos.Y = Math.min(1, cameraPos.Y);
	const canvasTileCountY = canvasManager.glCanvas.offsetHeight / 64.0;
	cameraPos.Y = Math.max(-(g_iMapHeight - canvasTileCountY + 0.5), cameraPos.Y);

	InputManager().Update(); // reset keys if released this frame
};

const Render = () => {
	canvasManager.gl.clear(canvasManager.gl.COLOR_BUFFER_BIT);

	const canvasWidth = canvasManager.glCanvas.offsetWidth;
	const canvasHeight = canvasManager.glCanvas.offsetHeight;
	// update all shaders
	for(let i = 0; i < g_AllShaders.length; ++i) {
		canvasManager.gl.useProgram(g_AllShaders[i].shader);
		
		var canvasSize = canvasManager.gl.getUniformLocation(g_AllShaders[i].shader, 'canvasSize');
		canvasManager.gl.uniform2fv(canvasSize, [canvasWidth, canvasHeight]);

		var cameraPosition = canvasManager.gl.getUniformLocation(g_AllShaders[i].shader, 'cameraPosition');
		canvasManager.gl.uniform2fv(cameraPosition, [ cameraPos.X, cameraPos.Y]);
	}
	
	g_oMap.Render();

	entityManager.Render();

	RenderUI();
};

function loop(timestamp) {
	var deltaTime = (timestamp - lastRender) / 1000;

	Update(deltaTime);

	Render();

	lastRender = timestamp;
	window.requestAnimationFrame(loop);
}

var lastRender = 0;

export const main = () => {

	// initialize all shaders
	for(let i = 0; i < g_AllShaders.length; ++i) {
		canvasManager.gl.useProgram(g_AllShaders[i].shader);
		
		var spriteSizeIndex = canvasManager.gl.getUniformLocation(g_AllShaders[i].shader, 'spriteSize');
		canvasManager.gl.uniform1f(spriteSizeIndex, g_iSpriteSize);
	}
	CreateMesh();

	window.requestAnimationFrame(loop);
};
import { g_AllShaders } from './shader.js';
import { InputManager } from './inputManager.js';
import { RenderUI } from './uiManager.js';
import { CreateMesh } from './mesh.js';
import { CanvasManager } from './canvasManager.js';
import { Map } from './mapManager.js';
import { Vector2 } from './vector2.js';
import { EntityManager } from './entityManager.js';
import { g_iSpriteSize } from './globalConstants.js';

const seed = 1;

const entityManager = new EntityManager(seed);
const canvasManager = new CanvasManager(seed);

const g_oMap = new Map(1);

const cameraPos = new Vector2(0,0);

const Update = (deltaTime) => {
	const cameraSpeed = 5;

	if(InputManager().keys.a === 1) {
		cameraPos.X += deltaTime * cameraSpeed;
	}
	if(InputManager().keys.d === 1) {
		cameraPos.X -= deltaTime * cameraSpeed;
	}
	if(InputManager().keys.w === 1) {
		cameraPos.Y -= deltaTime * cameraSpeed;
	}
	if(InputManager().keys.s === 1) {
		cameraPos.Y += deltaTime * cameraSpeed;
	}

	entityManager.Update(deltaTime);

	const halfCanvasTileCountX = (canvasManager.glCanvas.offsetWidth / 64.0) / 2.0;
	const halfCanvasTileCountY = (canvasManager.glCanvas.offsetHeight / 64.0) / 2.0;

	cameraPos.X = Math.min(halfCanvasTileCountX, cameraPos.X);
	cameraPos.X = Math.max(-g_oMap.MapWidth + halfCanvasTileCountX, cameraPos.X);

	cameraPos.Y = Math.min(halfCanvasTileCountY, cameraPos.Y);
	cameraPos.Y = Math.max(-g_oMap.MapHeight + halfCanvasTileCountY, cameraPos.Y);

	InputManager().Update(); // reset keys if released this frame
};

const Render = () => {
	canvasManager.gl.clear(canvasManager.gl.COLOR_BUFFER_BIT);

	const vCanvasSize = new Vector2(canvasManager.glCanvas.offsetWidth, canvasManager.glCanvas.offsetHeight);
	// update all shaders
	for(let i = 0; i < g_AllShaders.length; ++i) {
		g_AllShaders[i].shader.Bind();
		
		g_AllShaders[i].shader.SetUniform2f('canvasSize', vCanvasSize);
		g_AllShaders[i].shader.SetUniform2f('cameraPosition', cameraPos);
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
		g_AllShaders[i].shader.Bind();
		
		g_AllShaders[i].shader.SetUniform1f('spriteSize', g_iSpriteSize);
	}
	CreateMesh();

	window.requestAnimationFrame(loop);
};
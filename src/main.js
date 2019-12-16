import { DefaultShader, g_AllShaders } from './shader.js';
import { Renderable } from './renderable.js';
import { InputManager } from './inputManager.js';
import { GetTexture } from './textureManager.js';
import { RenderUI } from './uiManager.js';
import { CreateMesh } from './mesh.js';
import { glCanvas, gl, InitializeCanvasManager } from './canvasManager.js';
import { g_iMapHeight, Map } from './mapManager.js';
import { Vector2 } from './vector2.js';

var renderableObject = new Renderable(0, 0, DefaultShader(), GetTexture('blip.png'), [0,1,0,1]);
var terminator = new Renderable(0, 0, DefaultShader(), GetTexture('blip.png'), [1,0,0,1]);

const g_iSpriteSize = 64; // in pixels

const g_oMap = new Map(1);

const cameraPos = new Vector2(0,0);

const Update = (deltaTime) => {

	if(InputManager().keys.up == 1) {
		renderableObject.position.Y += deltaTime;
	}
	if(InputManager().keys.down == 1) {
		renderableObject.position.Y -= deltaTime;
	}
	if(InputManager().keys.left == 1) {
		renderableObject.position.X -= deltaTime;
	}
	if(InputManager().keys.right == 1) {
		renderableObject.position.X += deltaTime;
	}

	const terminatorDirection = new Vector2(renderableObject.position.X - terminator.position.X, renderableObject.position.Y - terminator.position.Y);
	terminatorDirection.Normalize();
	
	const terminatorSpeed = 0.5;

	terminator.position.X += terminatorDirection.X * deltaTime * terminatorSpeed;
	terminator.position.Y += terminatorDirection.Y * deltaTime * terminatorSpeed;

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
	cameraPos.X = Math.min(1, cameraPos.X);
	cameraPos.Y = Math.min(1, cameraPos.Y);
	const canvasTileCountY = glCanvas.offsetHeight / 64.0;
	cameraPos.Y = Math.max(-(g_iMapHeight - canvasTileCountY + 0.5), cameraPos.Y);

	InputManager().Update(); // reset keys if released this frame
};

const Render = () => {
	gl.clear(gl.COLOR_BUFFER_BIT);

	const canvasWidth = glCanvas.offsetWidth;
	const canvasHeight = glCanvas.offsetHeight;
	// update all shaders
	for(let i = 0; i < g_AllShaders.length; ++i) {
		gl.useProgram(g_AllShaders[i].shader);
		
		var canvasSize = gl.getUniformLocation(g_AllShaders[i].shader, 'canvasSize');
		gl.uniform2fv(canvasSize, [canvasWidth, canvasHeight]);

		var cameraPosition = gl.getUniformLocation(g_AllShaders[i].shader, 'cameraPosition');
		gl.uniform2fv(cameraPosition, [ cameraPos.X, cameraPos.Y]);
	}
	
	g_oMap.Render();

	renderableObject.Render();
	terminator.Render();

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

	gl.clearColor(0.5, 0.5, 0.5, 0.9);

	InitializeCanvasManager();

	// initialize all shaders
	for(let i = 0; i < g_AllShaders.length; ++i) {
		gl.useProgram(g_AllShaders[i].shader);
		
		var spriteSizeIndex = gl.getUniformLocation(g_AllShaders[i].shader, 'spriteSize');
		gl.uniform1f(spriteSizeIndex, g_iSpriteSize);
	}
	CreateMesh();

	window.requestAnimationFrame(loop);
};
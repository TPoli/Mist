import { DefaultShader, TileShader, g_AllShaders } from './shader.js';
import { Renderable } from './renderable.js';
import { InputManager } from './inputManager.js';
import { GetTexture } from './textureManager.js';

var canvas = document.getElementById('my_Canvas');
var gl = canvas.getContext('experimental-webgl');

var renderableObject = Renderable(0, 0, DefaultShader(), GetTexture('blip.png'), [0,1,0,1]);
var terminator = Renderable(0, 0, DefaultShader(), GetTexture('blip.png'), [1,0,0,1]);

const mapWidth = 20;
const mapHeight = 20;
const mapTiles = [];
const g_iSpriteSize = 64; // in pixels

const cameraPos = {
	X:0,
	Y:0
};

const CreateMesh = () => {
	var vertices = [ 
		-1.0,-1.0,0.0,	0,1,  //  1,1,1, // bottom left
		1.0, 1.0, 0.0,    1,0,//    1,0,1, // top right
		1.0,-1.0,0.0,   1,1,//  0,0,0,// bottom right
		-1.0, 1.0,0.0,   0,0 //  0,1,0// Top Left
	];
	var indices = [0,1,2, 0,1,3];
	
	var vertex_buffer = gl.createBuffer();
	
	gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
	gl.bindBuffer(gl.ARRAY_BUFFER, null);
	
	var Index_Buffer = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, Index_Buffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
	
	gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, Index_Buffer);
	
	for(let i = 0; i < g_AllShaders.length; ++i) {
		gl.useProgram(g_AllShaders[i].shader);
		//Get the attribute location
		var coord = gl.getAttribLocation(g_AllShaders[i].shader, 'coordinates');
		gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 20, 0);
		gl.enableVertexAttribArray(coord);
		
		// get the attribute location
		var uv = gl.getAttribLocation(g_AllShaders[i].shader, 'UV');
		gl.vertexAttribPointer(uv, 2, gl.FLOAT, false, 20, 12) ;
		gl.enableVertexAttribArray(uv);
	}
};

const Update = (deltaTime) => {

	if(InputManager().keys.up == 1) {
		renderableObject.Y += deltaTime;
	}
	if(InputManager().keys.down == 1) {
		renderableObject.Y -= deltaTime;
	}
	if(InputManager().keys.left == 1) {
		renderableObject.X -= deltaTime;
	}
	if(InputManager().keys.right == 1) {
		renderableObject.X += deltaTime;
	}

	const terminatorDirection = {
		X: renderableObject.X - terminator.X,
		Y: renderableObject.Y - terminator.Y
	};

	// normalize direction vector
	const terminatorDistance = Math.abs(terminatorDirection.X) + Math.abs(terminatorDirection.Y);
	if(terminatorDistance > 0) {
		terminatorDirection.X = terminatorDirection.X / terminatorDistance;
		terminatorDirection.Y = terminatorDirection.Y / terminatorDistance;

		const terminatorSpeed = 0.5;

		terminator.X += terminatorDirection.X * deltaTime * terminatorSpeed;
		terminator.Y += terminatorDirection.Y * deltaTime * terminatorSpeed;
	}
	

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
	const canvasTileCountY = canvas.offsetHeight / 64.0;
	cameraPos.Y = Math.max(-(mapHeight - canvasTileCountY + 0.5), cameraPos.Y);

	InputManager().Update(); // reset keys if released this frame
};

const Render = () => {
	gl.clear(gl.COLOR_BUFFER_BIT);

	const canvasWidth = canvas.offsetWidth;
	const canvasHeight = canvas.offsetHeight;
	// update all shaders
	for(let i = 0; i < g_AllShaders.length; ++i) {
		gl.useProgram(g_AllShaders[i].shader);
		
		var canvasSize = gl.getUniformLocation(g_AllShaders[i].shader, 'canvasSize');
		gl.uniform2fv(canvasSize, [canvasWidth, canvasHeight]);

		var cameraPosition = gl.getUniformLocation(g_AllShaders[i].shader, 'cameraPosition');
		gl.uniform2fv(cameraPosition, [ cameraPos.X, cameraPos.Y]);
	}
	
	for(let i = 0; i < mapTiles.length; ++i) {
		for(let j = 0; j < mapTiles[i].length; ++j) {
			mapTiles[i][j].Render();
		}
	}

	renderableObject.Render();
	terminator.Render();
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
	canvas.width = canvas.offsetWidth;
	canvas.height = canvas.offsetHeight;
	gl.viewport(0,0,canvas.width,canvas.height);
	gl.enable(gl.BLEND);
	gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

	GetTexture('f-texture.png');
	GetTexture('star.jpg');

	for (let i = 0; i < mapHeight; ++i) {
		const row = [];
		for (let j = 0; j < mapWidth; ++j) {
			if ((i + j) % 2 === 0) {
				row[j] = Renderable(j, i, TileShader(), GetTexture('star.jpg'));
			} else {
				row[j] = Renderable(j, i, TileShader(), GetTexture('f-texture.png'));
			}
		}
		mapTiles[i] = row;
	}

	// initialize all shaders
	for(let i = 0; i < g_AllShaders.length; ++i) {
		gl.useProgram(g_AllShaders[i].shader);
		
		var spriteSizeIndex = gl.getUniformLocation(g_AllShaders[i].shader, 'spriteSize');
		gl.uniform1f(spriteSizeIndex, g_iSpriteSize);
	}
	CreateMesh();

	window.requestAnimationFrame(loop);
};
import { DefaultShader } from './shader.js';
import { Renderable } from './renderable.js';
import { InputManager } from './inputManager.js';
import { GetTexture } from './textureManager.js';

var canvas = document.getElementById('my_Canvas');
var gl = canvas.getContext('experimental-webgl');

var renderableObject = Renderable(0, 0, DefaultShader(), GetTexture('f-texture.png'));

const CreateMesh = () => {
	var vertices = [ 
		-0.5,-0.5,0.0,	0,1,  //  1,1,1, // bottom left
		0.5,0.5,0.0,    1,0,//    1,0,1, // top right
		0.5,-0.5,0.0,   1,1,//  0,0,0,// bottom right
		-0.5,0.5,0.0,   0,0 //  0,1,0// Top Left
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
	
	gl.useProgram(DefaultShader());
	//Get the attribute location
	var coord = gl.getAttribLocation(DefaultShader(), 'coordinates');
	gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 20, 0);
	gl.enableVertexAttribArray(coord);
	
	// get the attribute location, stride + offest are off
	var uv = gl.getAttribLocation(DefaultShader(), 'UV');
	gl.vertexAttribPointer(uv, 2, gl.FLOAT, false, 20, 12) ;
	gl.enableVertexAttribArray(uv);
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

	InputManager().Update(); // reset keys
};

const Render = () => {
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	const canvasWidth = canvas.offsetWidth;
	const canvasHeight = canvas.offsetHeight;
	
	gl.useProgram(DefaultShader());
	var canvasSize = gl.getUniformLocation(DefaultShader(), 'canvasSize');
	gl.uniform2fv(canvasSize, [canvasWidth, canvasHeight]);

	renderableObject.Render();
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
	gl.enable(gl.DEPTH_TEST);
	gl.viewport(0,0,canvas.width,canvas.height);

	GetTexture('f-texture.png');
	GetTexture('star.jpg');

	var u_image0Location = gl.getUniformLocation(DefaultShader(), 'u_texture');
	gl.uniform1i(u_image0Location, 0);  // texture unit 0

	CreateMesh();

	window.requestAnimationFrame(loop);
};
import { DefaultShader } from './shader.js';
import { Renderable } from './renderable.js';
import { InputManager } from './inputManager.js';

var canvas = document.getElementById('my_Canvas');
var gl = canvas.getContext('experimental-webgl');

var renderableObject = Renderable(0, 0, DefaultShader());
const spritePosition = {
	X : 0,
	Y : 0
};

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
	//var position = gl.getUniformLocation(DefaultShader(), 'position');
	//gl.uniform2fv(position, [0.2, 0]);

	if(InputManager().keys.up == 1) {
		spritePosition.Y += deltaTime;
	}
	if(InputManager().keys.down == 1) {
		spritePosition.Y -= deltaTime;
	}
	if(InputManager().keys.left == 1) {
		spritePosition.X -= deltaTime;
	}
	if(InputManager().keys.right == 1) {
		spritePosition.X += deltaTime;
	}

	var position = gl.getUniformLocation(DefaultShader(), 'position');
	gl.uniform2fv(position, [spritePosition.X, spritePosition.Y]);

	

	const canvasWidth = canvas.offsetWidth;
	const canvasHeight = canvas.offsetHeight;

	var canvasSize = gl.getUniformLocation(DefaultShader(), 'canvasSize');
	gl.uniform2fv(canvasSize, [canvasWidth, canvasHeight]);

	InputManager().Update(); // reset keys
};

const Render = () => {
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	renderableObject.Render();

	//gl.useProgram(DefaultShader());
	//gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT,0); // always render 2 triangles
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

	
	// Create a texture.
	var texture = gl.createTexture();
	gl.bindTexture(gl.TEXTURE_2D, texture);
 
	// Fill the texture with a 1x1 blue pixel.
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
		new Uint8Array([0, 0, 255, 255]));

	// Asynchronously load an image
	var image = new Image();
	image.src = 'f-texture.png';
	image.addEventListener('load', function() {
	// Now that the image has loaded make copy it to the texture.
		gl.bindTexture(gl.TEXTURE_2D, texture);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,gl.UNSIGNED_BYTE, image);
		gl.generateMipmap(gl.TEXTURE_2D);
	});

	

	CreateMesh();

	window.requestAnimationFrame(loop);
};
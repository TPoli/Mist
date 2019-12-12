import { DefaultShader } from './shader.js';
import { Renderable } from './renderable.js';

var canvas = document.getElementById('my_Canvas');
var gl = canvas.getContext('experimental-webgl');

var renderableObject = Renderable(0, 0, DefaultShader());

const CreateMesh = () => {
	var vertices = [ 
		-0.5,-0.5,0.0,  //  1,1,1, // bottom left
		0.5,0.5,0.0,    //    1,0,1, // top right
		0.5,-0.5,0.0,   //  0,0,0,// bottom right
		-0.5,0.5,0.0,   //  0,1,0// Top Left
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
	
	//Get the attribute location
	var coord = gl.getAttribLocation(DefaultShader(), 'coordinates');
	gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0 * gl.FLOAT, 0);
	gl.enableVertexAttribArray(coord);
	
	// get the attribute location, stride + offest are off
	var color = gl.getAttribLocation(DefaultShader(), 'color');
	gl.vertexAttribPointer(color, 3, gl.FLOAT, false, 0 * gl.FLOAT, 0 * gl.FLOAT) ;
	gl.enableVertexAttribArray(color);
};

const Update = (deltaTime) => {
	//var position = gl.getUniformLocation(DefaultShader(), 'position');
	//gl.uniform2fv(position, [0.2, 0]);
};

const Render = () => {
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	renderableObject.Render();

	//gl.useProgram(DefaultShader());
	//gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT,0); // always render 2 triangles
};

function loop(timestamp) {
	//const seconds = (timestamp / 1000);
	var deltaTime = timestamp - lastRender;

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

	
	CreateMesh();

	window.requestAnimationFrame(loop);
};
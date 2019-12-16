import { g_AllShaders } from './shader.js';

var canvas = document.getElementById('my_Canvas');
var gl = canvas.getContext('experimental-webgl');

export const CreateMesh = () => {
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
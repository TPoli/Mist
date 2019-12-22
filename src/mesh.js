import { g_AllShaders } from './shader.js';

var canvas = document.getElementById('my_Canvas');
var gl = canvas.getContext('experimental-webgl');

export const CreateMesh = () => {
	var vertices = [
	//	X		Y		Z		UV
		-1.0,	-1.0,	0.0,	0,1,
		1.0,	1.0,	0.0,	1,0,
		1.0,	-1.0,	0.0,	1,1,
		-1.0,	1.0,	0.0,	0,0
	];
	// eslint-disable-next-line no-magic-numbers
	var indices = [0,1,2, 0,1,3];
	
	var vertex_buffer = gl.createBuffer();
	
	gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
	gl.bindBuffer(gl.ARRAY_BUFFER, null);
	
	const Index_Buffer = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, Index_Buffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
	
	gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, Index_Buffer);

	const floatByteSize = 4;
	const vertSize = 3;
	const uvSize = 2;
	const vertexByteSize = (vertSize + uvSize) * floatByteSize;
	const uvOffest = vertSize * floatByteSize;
	
	for(let i = 0; i < g_AllShaders.length; ++i) {
		g_AllShaders[i].shader.Bind();
		//Get the attribute location
		const coord = gl.getAttribLocation(g_AllShaders[i].shader.shaderID, 'coordinates');
		gl.vertexAttribPointer(coord, vertSize, gl.FLOAT, false, vertexByteSize, 0);
		gl.enableVertexAttribArray(coord);
		
		// get the attribute location
		const uv = gl.getAttribLocation(g_AllShaders[i].shader.shaderID, 'UV');
		gl.vertexAttribPointer(uv, uvSize, gl.FLOAT, false, vertexByteSize, uvOffest);
		gl.enableVertexAttribArray(uv);
	}
};